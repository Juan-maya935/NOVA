import React, { useEffect, useRef, useState } from 'react';

export const DataSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataPoints, setDataPoints] = useState<number[]>(Array(20).fill(50));
  const [activeRate, setActiveRate] = useState<number>(4.2);

  useEffect(() => {
    // Generate initial noise
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const nextPoints = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1];
        const change = (Math.random() * 20 - 10);
        const nextVal = Math.min(95, Math.max(10, lastVal + change));
        
        // Update active rate telemetry text
        setActiveRate(Number((nextVal / 20 + 2).toFixed(2)));
        return [...nextPoints, nextVal];
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Grid
      ctx.strokeStyle = 'rgba(99, 85, 217, 0.05)';
      ctx.lineWidth = 1;
      const gridSpacing = 20;
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Live Telemetry Line Chart
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const step = w / (dataPoints.length - 1);
      dataPoints.forEach((val, idx) => {
        const x = idx * step;
        const y = h - (val / 100) * (h - 20) - 10;
        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Draw Area Fill below line
      ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Draw Glowing endpoints
      ctx.fillStyle = '#6355d9';
      dataPoints.forEach((val, idx) => {
        if (idx === dataPoints.length - 1 || idx % 4 === 0) {
          const x = idx * step;
          const y = h - (val / 100) * (h - 20) - 10;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw HUD Labels
      ctx.fillStyle = 'rgba(99, 85, 217, 0.8)';
      ctx.font = '7px JetBrains Mono';
      ctx.fillText(`TRANSMISSION_RATE: ${activeRate} MB/S`, 10, 15);
      ctx.fillText('STATUS: SYNCHRONIZED', 10, 25);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [dataPoints, activeRate]);

  // Click to trigger a telemetry spike
  const triggerSpike = () => {
    setDataPoints(prev => {
      const nextPoints = [...prev];
      nextPoints[nextPoints.length - 1] = 95; // spike the last value
      return nextPoints;
    });
  };

  return (
    <div 
      onClick={triggerSpike}
      className="w-full h-[180px] bg-nova-darker/60 rounded-sm relative overflow-hidden border border-nova-gray-border/30 cursor-pointer group"
      title="Clic para inducir pico de telemetría"
    >
      <canvas 
        ref={canvasRef} 
        width={340} 
        height={180} 
        className="w-full h-full"
      />
      <div className="absolute top-2 right-2 bg-nova-dark/80 px-2 py-0.5 border border-nova-gray-border/50 rounded-[2px] font-mono text-[8px] text-gray-500 group-hover:text-nova-electric transition-colors uppercase">
        // SIMULADOR_SPIKE
      </div>
    </div>
  );
};
