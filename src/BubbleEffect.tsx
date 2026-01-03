import { useEffect, useRef } from 'react';

interface BubbleEffectProps {
  trigger?: number;
}

export function BubbleEffect({ trigger }: BubbleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trigger) return;

    const createBubble = () => {
      const bubble = document.createElement('div');
      const size = Math.random() * 30 + 20;
      const duration = 3 + Math.random() * 2;

      bubble.className = 'bubble';
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.bottom = '0';
      bubble.style.opacity = String(Math.random() * 0.5 + 0.3);
      bubble.style.animation = `float ${duration}s ease-out forwards`;

      containerRef.current?.appendChild(bubble);

      setTimeout(() => bubble.remove(), duration * 1000);
    };

    const interval = setInterval(createBubble, 300);
    return () => clearInterval(interval);
  }, [trigger]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
}
