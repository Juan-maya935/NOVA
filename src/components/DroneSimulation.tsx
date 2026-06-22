import React, { useEffect, useRef, useState } from 'react';

export const DroneSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [droneX, setDroneX] = useState<number>(170);
  const mouseX = useRef<number>(170);
  const sweepAngle = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // Scale coordinate to fit internal resolution
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    mouseX.current = x;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Define terrain points once
    const terrainPoints: { x: number; y: number }[] = [];
    const numPoints = 15;
    const step = canvas.width / (numPoints - 1);
    for (let i = 0; i < numPoints; i++) {
      const x = i * step;
      // create a wavy mountain profile
      const y = canvas.height - 40 - Math.sin(i * 0.8) * 15 - Math.cos(i * 0.3) * 10;
      terrainPoints.push({ x, y });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Smoothly interpolate drone position towards target mouse position
      setDroneX(prev => {
        const diff = mouseX.current - prev;
        return prev + diff * 0.05; // easing rate
      });

      // Background lines grid
      ctx.strokeStyle = 'rgba(99, 85, 217, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Sweep angle updates
      sweepAngle.current += 0.03;
      const sweepOffset = Math.sin(sweepAngle.current) * 80;
      const scanTargetX = droneX + sweepOffset;

      // Draw Scanning Laser Beams
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 6;
      
      // Draw Laser paths
      ctx.beginPath();
      ctx.moveTo(droneX, 30);
      ctx.lineTo(scanTargetX - 10, h - 30);
      ctx.moveTo(droneX, 30);
      ctx.lineTo(scanTargetX + 10, h - 30);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw Terrain Wireframe
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      terrainPoints.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();

      // Highlight scanned terrain vertices
      terrainPoints.forEach(pt => {
        const distanceToScan = Math.abs(pt.x - scanTargetX);
        const isScanned = distanceToScan < 30;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isScanned ? 3.5 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isScanned ? '#00f0ff' : 'rgba(255, 255, 255, 0.3)';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = isScanned ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Drone Chassis (Cyberpunk Wireframe style)
      ctx.fillStyle = '#6355d9';
      ctx.strokeStyle = '#8c7cf0';
      ctx.lineWidth = 2;
      
      // Center hub
      ctx.beginPath();
      ctx.arc(droneX, 30, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Arms left & right
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(droneX - 25, 26); ctx.lineTo(droneX + 25, 26);
      ctx.stroke();

      // Propeller hubs
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(droneX - 25, 24, 3, 0, Math.PI * 2);
      ctx.arc(droneX + 25, 24, 3, 0, Math.PI * 2);
      ctx.fill();

      // Propeller blades spinning lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(droneX - 25, 24, 10, 0, Math.PI * 2);
      ctx.arc(droneX + 25, 24, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Drone Camera Mount
      ctx.fillStyle = '#111224';
      ctx.beginPath();
      ctx.rect(droneX - 3, 35, 6, 5);
      ctx.fill();

      // HUD text
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.font = '7px JetBrains Mono';
      ctx.fillText(`LASER_ANGLE: ${(Math.sin(sweepAngle.current) * 35).toFixed(1)}°`, 10, 15);
      ctx.fillText(`DRONE_X: ${droneX.toFixed(0)}`, 10, 25);
      ctx.fillText('LIDAR_STATUS: SCANN_ACTIVE', 10, 35);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [droneX]);

  return (
    <div 
      className="w-full h-[180px] bg-nova-darker/60 rounded-sm relative overflow-hidden border border-nova-gray-border/30 cursor-crosshair group"
      title="Mueve el ratón para guiar el dron"
    >
      <canvas 
        ref={canvasRef} 
        width={340} 
        height={180} 
        onMouseMove={handleMouseMove}
        className="w-full h-full"
      />
      <div className="absolute top-2 right-2 bg-nova-dark/80 px-2 py-0.5 border border-nova-gray-border/50 rounded-[2px] font-mono text-[8px] text-gray-500 group-hover:text-nova-electric transition-colors uppercase">
        // CONTROL_DRON_ACTIVO
      </div>
    </div>
  );
};
