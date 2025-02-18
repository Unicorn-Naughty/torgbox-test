import React, { useEffect, useRef, useState } from 'react';

interface ClockProps {
  timezoneOffset: number;
}

const Clock: React.FC<ClockProps> = ({ timezoneOffset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;

    const drawClock = () => {
      const now = new Date();
      const localTime = new Date(now.getTime() + timezoneOffset * 3600 * 1000);
      const seconds = localTime.getSeconds();
      const minutes = localTime.getMinutes();
      const hours = localTime.getHours();

      // Update digital time display
      setCurrentTime(localTime.toLocaleTimeString('en-US', { hour12: false }));

      context.clearRect(0, 0, 200, 200);
      context.beginPath();
      context.arc(100, 100, 95, 0, 2 * Math.PI);
      context.stroke();

      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        context.moveTo(100 + 80 * Math.cos(angle), 100 + 80 * Math.sin(angle));
        context.lineTo(100 + 90 * Math.cos(angle), 100 + 90 * Math.sin(angle));
      }
      context.stroke();

      const drawHand = (length: number, width: number, angle: number) => {
        context.beginPath();
        context.lineWidth = width;
        context.moveTo(100, 100);
        context.lineTo(100 + length * Math.cos(angle), 100 + length * Math.sin(angle));
        context.stroke();
      };

      drawHand(50, 6, ((hours % 12) + minutes / 60) * (Math.PI / 6) - Math.PI / 2);
      drawHand(70, 4, (minutes + seconds / 60) * (Math.PI / 30) - Math.PI / 2);
      drawHand(90, 2, seconds * (Math.PI / 30) - Math.PI / 2);
    };

    const interval = setInterval(drawClock, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={200} />
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '20px' }}>
        {currentTime}
      </div>
    </div>
  );
};

export default Clock;