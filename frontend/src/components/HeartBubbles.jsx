import React, { useEffect, useRef } from 'react';

// Global click handler that spawns floating heart bubbles + sparkles at the
// click position, per the brief. Pure DOM/CSS - no dependency needed.
export default function HeartBubbles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ['#FF9FC7', '#C9BBFF', '#FFFFFF', '#8FC7FF'];

    function handleClick(e) {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = '♥';
        heart.style.position = 'fixed';
        heart.style.left = `${e.clientX + (Math.random() * 30 - 15)}px`;
        heart.style.top = `${e.clientY + (Math.random() * 10 - 5)}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = `${12 + Math.random() * 10}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = 9997;
        heart.style.animation = `heartFloat 1.4s ease-out forwards`;
        heart.style.animationDelay = `${i * 0.08}s`;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
      }

      for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = `${e.clientX + (Math.random() * 40 - 20)}px`;
        spark.style.top = `${e.clientY + (Math.random() * 40 - 20)}px`;
        spark.style.width = '5px';
        spark.style.height = '5px';
        spark.style.borderRadius = '50%';
        spark.style.background = '#fff';
        spark.style.boxShadow = '0 0 6px 2px rgba(255,255,255,0.9)';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = 9997;
        spark.style.animation = 'sparklePop 0.8s ease-out forwards';
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 850);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div ref={containerRef} />
      <style>{`
        @keyframes heartFloat {
          0% { transform: translate(-50%,-50%) scale(0.4) translateY(0); opacity: 1; }
          15% { transform: translate(-50%,-50%) scale(1) translateY(-10px); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(0.8) translateY(-120px); opacity: 0; }
        }
        @keyframes sparklePop {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1) translateY(-40px); opacity: 0; }
        }
      `}</style>
    </>
  );
}
