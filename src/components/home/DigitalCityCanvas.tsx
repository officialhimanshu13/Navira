import React, { useEffect, useRef } from 'react';

export const DigitalCityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Grid coordinates representing Chandigarh & Mohali commercial clusters
    const nodes: Array<{
      x: number;
      y: number;
      label: string;
      radius: number;
      phase: number;
      speed: number;
      color: string;
    }> = [
      { x: 0.22, y: 0.45, label: 'Sector 17 CHD', radius: 4, phase: 0, speed: 0.03, color: '#19BDF0' },
      { x: 0.35, y: 0.32, label: 'Sector 35 CHD', radius: 4.5, phase: 1.2, speed: 0.025, color: '#10B981' },
      { x: 0.48, y: 0.58, label: 'Sector 26 CHD', radius: 3.5, phase: 2.1, speed: 0.02, color: '#38BDF8' },
      { x: 0.62, y: 0.40, label: 'Phase 7 Mohali', radius: 4.5, phase: 0.8, speed: 0.03, color: '#10B981' },
      { x: 0.75, y: 0.62, label: 'Phase 3B2 Mohali', radius: 4, phase: 2.5, speed: 0.025, color: '#19BDF0' },
      { x: 0.82, y: 0.35, label: 'Sector 82 JLPL', radius: 3.5, phase: 3.2, speed: 0.02, color: '#A78BFA' },
      { x: 0.28, y: 0.70, label: 'Ind. Area Ph-1', radius: 3, phase: 1.8, speed: 0.022, color: '#38BDF8' },
      { x: 0.55, y: 0.78, label: 'Phase 5 Mohali', radius: 3.8, phase: 0.5, speed: 0.028, color: '#10B981' },
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle perspective horizon lines
      const horizonY = height * 0.82;
      ctx.strokeStyle = 'rgba(25, 189, 240, 0.05)';
      ctx.lineWidth = 1;

      // Perspective vertical rays
      const vanishingPointX = width * 0.5;
      const vanishingPointY = height * 0.2;
      for (let i = -8; i <= 8; i++) {
        const xBottom = vanishingPointX + i * (width * 0.08);
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, vanishingPointY);
        ctx.lineTo(xBottom, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = height * 0.35; y < height; y += (height - y) * 0.35 + 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(25, 189, 240, ${(y / height) * 0.08})`;
        ctx.stroke();
      }

      // Connect nodes with data pulses
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const x1 = n1.x * width;
          const y1 = n1.y * height;
          const x2 = n2.x * width;
          const y2 = n2.y * height;
          const dist = Math.hypot(x2 - x1, y2 - y1);

          if (dist < width * 0.38) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.stroke();

            // Moving pulse packet
            const pulsePos = (Math.sin(t * 1.5 + i + j) + 1) / 2;
            const px = x1 + (x2 - x1) * pulsePos;
            const py = y1 + (y2 - y1) * pulsePos;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = n1.color;
            ctx.shadowColor = n1.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulse = Math.sin(t * 2 + node.phase);
        const radius = node.radius + pulse * 1.2;

        // Outer beacon ring
        ctx.beginPath();
        ctx.arc(x, y, radius * 2.5 + pulse * 2, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.15 + (pulse + 1) * 0.1;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Locality label
        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
        ctx.fillText(node.label, x + 8, y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
    />
  );
};

