import React, { useEffect, useRef, useState } from 'react';

interface ConveyorItem {
  id: number;
  x: number;
  isDefect: boolean;
  score: number;
}

export const VisionSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<ConveyorItem[]>([
    { id: 1, x: 50, isDefect: false, score: 99.2 },
    { id: 2, x: 170, isDefect: false, score: 98.7 },
    { id: 3, x: 290, isDefect: false, score: 99.5 }
  ]);
  const [forceDefectFlag, setForceDefectFlag] = useState<boolean>(false);
  const idCounter = useRef<number>(4);

  // Trigger a defect for the next spawned item
  const triggerDefect = () => {
    setForceDefectFlag(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        // Move items forward
        let updated = prev.map(item => ({ ...item, x: item.x + 3 }));

        // Remove offscreen items
        updated = updated.filter(item => item.x < 360);

        // Spawn new item if the last one moved far enough
        const lastItem = updated[updated.length - 1];
        if (!lastItem || lastItem.x > 120) {
          const id = idCounter.current++;
          const score = Number((95 + Math.random() * 4.9).toFixed(1));
          updated.push({
            id,
            x: 0,
            isDefect: forceDefectFlag, // use defect flag
            score
          });
          if (forceDefectFlag) setForceDefectFlag(false); // reset flag
        }

        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [forceDefectFlag]);

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

      // Draw Conveyor belt lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const beltY = h / 2 + 15;
      
      ctx.beginPath();
      ctx.moveTo(0, beltY); ctx.lineTo(w, beltY);
      ctx.moveTo(0, beltY + 10); ctx.lineTo(w, beltY + 10);
      ctx.stroke();

      // Draw rollers
      ctx.fillStyle = 'rgba(99, 85, 217, 0.15)';
      for (let rx = 20; rx < w; rx += 50) {
        ctx.beginPath();
        ctx.arc(rx, beltY + 5, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Scan portal/inspection line
      const scanLineX = w / 2;
      ctx.strokeStyle = 'rgba(140, 124, 240, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanLineX, 10); ctx.lineTo(scanLineX, h - 10);
      ctx.stroke();

      // Draw Items and AI Bounding Boxes
      items.forEach(item => {
        const itemY = h / 2 - 10;
        const radius = 14;

        // Draw physical object (Gear or Circle with technical details)
        ctx.fillStyle = '#111224';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(item.x, itemY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Object inner core detail
        ctx.fillStyle = item.isDefect ? '#fda4af' : 'rgba(99, 85, 217, 0.3)';
        ctx.beginPath();
        ctx.arc(item.x, itemY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw Bounding Box and label if item is being inspected (i.e. has passed the middle or is close)
        const isPastInspection = item.x > scanLineX - 40;
        if (isPastInspection) {
          const boxSize = 36;
          const boxX = item.x - boxSize / 2;
          const boxY = itemY - boxSize / 2;

          ctx.strokeStyle = item.isDefect ? '#fda4af' : '#00f0ff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          // Draw corners of bounding box
          ctx.rect(boxX, boxY, boxSize, boxSize);
          ctx.stroke();

          // Write Bounding box text label
          ctx.fillStyle = item.isDefect ? '#f43f5e' : '#00f0ff';
          ctx.font = '6.5px JetBrains Mono';
          const label = item.isDefect ? `ALERT: DEFECT // ${item.score}%` : `CLASS: OBJ_OK // ${item.score}%`;
          ctx.fillText(label, boxX, boxY - 4);
        }
      });

      // Draw Scanner Beam Flash (Scan Portals laser)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(scanLineX, 20); ctx.lineTo(scanLineX, h - 20);
      ctx.stroke();

      // HUD text
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.font = '7px JetBrains Mono';
      ctx.fillText(`FPS: 60`, 10, 15);
      ctx.fillText(`SPAWN_FLAG: ${forceDefectFlag ? 'INJECT_ERROR' : 'NOMINAL'}`, 10, 25);
      ctx.fillText('AI_STATUS: ACTIVE_SORTING', 10, 35);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [items, forceDefectFlag]);

  return (
    <div 
      onClick={triggerDefect}
      className="w-full h-[180px] bg-nova-darker/60 rounded-sm relative overflow-hidden border border-nova-gray-border/30 cursor-pointer group"
      title="Clic para inducir un objeto defectuoso"
    >
      <canvas 
        ref={canvasRef} 
        width={340} 
        height={180} 
        className="w-full h-full"
      />
      <div className="absolute top-2 right-2 bg-nova-dark/80 px-2 py-0.5 border border-nova-gray-border/50 rounded-[2px] font-mono text-[8px] text-gray-500 group-hover:text-rose-400 transition-colors uppercase">
        {forceDefectFlag ? 'ERROR_SPIKE_ARMED' : '// INJECT_DEFECT_ERR'}
      </div>
    </div>
  );
};
