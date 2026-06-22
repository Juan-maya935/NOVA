import React, { useRef, useEffect, useState } from 'react';
import { Compass, ZoomIn, ZoomOut, Play, Pause } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

export const Interactive3DViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelType, setModelType] = useState<'drone' | 'terrain' | 'satellite'>('drone');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.8 });
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 3D Model Vertices and Edges Definitions
  const models: Record<string, { vertices: Point3D[]; edges: Edge[] }> = {
    drone: {
      vertices: [
        // Center Hub
        { x: 0, y: 0, z: 0 },
        // Arm 1
        { x: 0.8, y: 0.1, z: 0.8 },
        // Arm 2
        { x: 0.8, y: 0.1, z: -0.8 },
        // Arm 3
        { x: -0.8, y: 0.1, z: 0.8 },
        // Arm 4
        { x: -0.8, y: 0.1, z: -0.8 },
        // Propeller Hub 1
        { x: 0.8, y: 0.2, z: 0.8 },
        // Propeller Hub 2
        { x: 0.8, y: 0.2, z: -0.8 },
        // Propeller Hub 3
        { x: -0.8, y: 0.2, z: 0.8 },
        // Propeller Hub 4
        { x: -0.8, y: 0.2, z: -0.8 },
        // Camera Mount
        { x: 0, y: -0.3, z: 0.2 },
        // Landing Gear Left Front
        { x: 0.3, y: -0.4, z: 0.3 },
        // Landing Gear Right Front
        { x: 0.3, y: -0.4, z: -0.3 },
        // Landing Gear Left Back
        { x: -0.3, y: -0.4, z: 0.3 },
        // Landing Gear Right Back
        { x: -0.3, y: -0.4, z: -0.3 },
      ],
      edges: [
        // Arms
        { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 },
        // Propeller Hubs
        { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }, { a: 4, b: 8 },
        // Camera
        { a: 0, b: 9 },
        // Landing Gear
        { a: 0, b: 10 }, { a: 0, b: 11 }, { a: 0, b: 12 }, { a: 0, b: 13 },
        { a: 10, b: 12 }, { a: 11, b: 13 },
      ],
    },
    terrain: {
      vertices: [
        // Grid 4x4
        { x: -0.9, y: 0, z: -0.9 }, { x: -0.3, y: 0.1, z: -0.9 }, { x: 0.3, y: -0.1, z: -0.9 }, { x: 0.9, y: 0.1, z: -0.9 },
        { x: -0.9, y: -0.1, z: -0.3 }, { x: -0.3, y: 0.4, z: -0.3 }, { x: 0.3, y: 0.2, z: -0.3 }, { x: 0.9, y: -0.2, z: -0.3 },
        { x: -0.9, y: 0.1, z: 0.3 }, { x: -0.3, y: 0.3, z: 0.3 }, { x: 0.3, y: 0.5, z: 0.3 }, { x: 0.9, y: 0, z: 0.3 },
        { x: -0.9, y: -0.2, z: 0.9 }, { x: -0.3, y: 0, z: 0.9 }, { x: 0.3, y: 0.2, z: 0.9 }, { x: 0.9, y: -0.1, z: 0.9 },
      ],
      edges: [
        // Horizontal rows
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
        { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 },
        { a: 8, b: 9 }, { a: 9, b: 10 }, { a: 10, b: 11 },
        { a: 12, b: 13 }, { a: 13, b: 14 }, { a: 14, b: 15 },
        // Vertical columns
        { a: 0, b: 4 }, { a: 4, b: 8 }, { a: 8, b: 12 },
        { a: 1, b: 5 }, { a: 5, b: 9 }, { a: 9, b: 13 },
        { a: 2, b: 6 }, { a: 6, b: 10 }, { a: 10, b: 14 },
        { a: 3, b: 7 }, { a: 7, b: 11 }, { a: 11, b: 15 },
      ]
    },
    satellite: {
      vertices: [
        // Satellite Body (Cube)
        { x: -0.3, y: -0.3, z: -0.3 }, { x: 0.3, y: -0.3, z: -0.3 },
        { x: 0.3, y: 0.3, z: -0.3 }, { x: -0.3, y: 0.3, z: -0.3 },
        { x: -0.3, y: -0.3, z: 0.3 }, { x: 0.3, y: -0.3, z: 0.3 },
        { x: 0.3, y: 0.3, z: 0.3 }, { x: -0.3, y: 0.3, z: 0.3 },
        // Solar Panel Left Wing
        { x: -1.2, y: -0.1, z: 0 }, { x: -0.3, y: -0.1, z: 0 },
        { x: -0.3, y: 0.1, z: 0 }, { x: -1.2, y: 0.1, z: 0 },
        // Solar Panel Right Wing
        { x: 0.3, y: -0.1, z: 0 }, { x: 1.2, y: -0.1, z: 0 },
        { x: 1.2, y: 0.1, z: 0 }, { x: 0.3, y: 0.1, z: 0 },
        // Antenna
        { x: 0, y: 0.3, z: 0 }, { x: 0, y: 0.7, z: 0 },
        { x: -0.1, y: 0.8, z: 0 }, { x: 0.1, y: 0.8, z: 0 },
      ],
      edges: [
        // Cube
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 },
        { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 },
        { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 },
        // Left Panel
        { a: 8, b: 9 }, { a: 9, b: 10 }, { a: 10, b: 11 }, { a: 11, b: 8 },
        // Right Panel
        { a: 12, b: 13 }, { a: 13, b: 14 }, { a: 14, b: 15 }, { a: 15, b: 12 },
        // Antenna
        { a: 16, b: 17 }, { a: 17, b: 18 }, { a: 17, b: 19 }, { a: 18, b: 19 },
      ]
    }
  };

  // Drag and rotate handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Auto rotation
      if (isAutoRotating && !isDragging.current) {
        setRotation(prev => ({
          x: prev.x + 0.003,
          y: prev.y + 0.006
        }));
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Project 3D points to 2D
      const projected: { x: number; y: number }[] = [];
      const model = models[modelType];

      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);

      model.vertices.forEach(v => {
        // Rotate Y
        let x = v.x * cosY - v.z * sinY;
        let z = v.x * sinY + v.z * cosY;

        // Rotate X
        let y = v.y * cosX - z * sinX;
        z = v.y * sinX + z * cosX;

        // Perspective projection
        const scale = zoom / (z + 2.5);
        projected.push({
          x: cx + x * scale,
          y: cy - y * scale
        });
      });

      // Draw Grid / Floor radar circle
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = 'rgba(99, 85, 217, 0.1)';
      ctx.beginPath();
      ctx.moveTo(cx - 130, cy); ctx.lineTo(cx + 130, cy);
      ctx.moveTo(cx, cy - 130); ctx.lineTo(cx, cy + 130);
      ctx.stroke();

      // Draw Edges
      model.edges.forEach(edge => {
        const p1 = projected[edge.a];
        const p2 = projected[edge.b];

        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Cool neon gradients or styling
          ctx.strokeStyle = modelType === 'drone' ? 'rgba(0, 240, 255, 0.7)' :
                            modelType === 'terrain' ? 'rgba(140, 124, 240, 0.7)' : 'rgba(0, 240, 255, 0.7)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // Draw Vertices (Glow dots)
      projected.forEach((p, i) => {
        ctx.fillStyle = i === 0 ? '#6355d9' : '#00f0ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, i === 0 ? 4 : 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw HUD overlay inside canvas
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.font = '8px JetBrains Mono';
      ctx.fillText(`MODEL: ${modelType.toUpperCase()}`, 15, 20);
      ctx.fillText(`ROT_X: ${rotation.x.toFixed(2)}`, 15, 32);
      ctx.fillText(`ROT_Y: ${rotation.y.toFixed(2)}`, 15, 44);
      ctx.fillText(`ZOOM: ${zoom}%`, 15, 56);
      ctx.fillText(`SYSTEM_GL: OK`, 15, 68);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation, modelType, zoom, isAutoRotating]);

  return (
    <div className="bg-nova-dark/85 border border-nova-gray-border p-4 rounded-sm tech-corner flex flex-col justify-between w-full h-[380px] relative select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-nova-gray-border/60 pb-2 mb-2 font-mono text-[9px] text-gray-500">
        <span className="flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-nova-electric animate-spin-slow" />
          <span className="tracking-widest">3D_RENDER_VIEWER.sys</span>
        </span>
        <span className="text-nova-electric">// INTERACTIVO</span>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-grow flex items-center justify-center relative cursor-grab active:cursor-grabbing bg-nova-darker/60 rounded-sm overflow-hidden border border-nova-gray-border/30">
        <canvas
          ref={canvasRef}
          width={280}
          height={220}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="max-w-full"
        />
        <div className="absolute bottom-2 right-2 font-mono text-[8px] text-gray-500 bg-nova-dark/80 px-2 py-0.5 border border-nova-gray-border/50 rounded-[2px]">
          ARRASTRAR PARA ROTAR
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-nova-gray-border/40 pt-3">
        {/* Model Select */}
        <div className="flex bg-nova-indigo-deep/60 p-0.5 rounded-sm border border-nova-gray-border/85">
          {(['drone', 'terrain', 'satellite'] as const).map(type => (
            <button
              key={type}
              onClick={() => setModelType(type)}
              className={`px-2 py-1 font-mono text-[8px] uppercase tracking-wider rounded-[2px] transition-colors ${
                modelType === type 
                  ? 'bg-nova-purple text-white' 
                  : 'text-gray-500 hover:text-nova-electric'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1">
          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1.5 border rounded-sm transition-colors ${
              isAutoRotating 
                ? 'border-nova-electric/30 bg-nova-electric/5 text-nova-electric' 
                : 'border-nova-gray-border text-gray-500 hover:text-white'
            }`}
            title="Auto Rotar"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoom(prev => Math.max(50, prev - 10))}
            className="p-1.5 border border-nova-gray-border rounded-sm text-gray-500 hover:text-white hover:border-nova-electric transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom In */}
          <button
            onClick={() => setZoom(prev => Math.min(180, prev + 10))}
            className="p-1.5 border border-nova-gray-border rounded-sm text-gray-500 hover:text-white hover:border-nova-electric transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Decorative technical lights */}
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-nova-electric pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-nova-purple pointer-events-none" />
    </div>
  );
};
