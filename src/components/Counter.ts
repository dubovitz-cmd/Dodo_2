import { useState, useEffect } from 'react';

interface CounterProps {
  value: number;
  isLoading?: boolean;
}

export function Counter({ value, isLoading = false }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (displayValue === value) return;

    const difference = value - displayValue;
    const steps = Math.abs(difference);
    const duration = Math.min(800, steps * 15);
    const stepDuration = duration / steps;

    let currentStep = 0;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTime;

      if (elapsed >= stepDuration) {
        currentStep++;
        const direction = difference > 0 ? 1 : -1;
        setDisplayValue((prev) => prev + direction);
        lastTime = now;
      }

      if (currentStep < steps) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, displayValue]);

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-7xl font-bold text-blue-600 tabular-nums tracking-tight">
          {displayValue.toLocaleString('hu-HU')}
        </div>
      </div>
      {isLoading && (
        <div className="text-gray-400 text-sm">
          Betöltés...
        </div>
      )}
    </div>
  );
}
