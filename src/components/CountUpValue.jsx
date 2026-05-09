import { useEffect, useRef, useState } from 'react';

const CountUpValue = ({ value, formatter, duration = 900, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    const start = previousValue.current;
    const end = Number(value) || 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentValue = start + (end - start) * eased;
      setDisplayValue(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        previousValue.current = end;
      }
    };

    const frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, value]);

  return <span className={className}>{formatter(displayValue)}</span>;
};

export default CountUpValue;
