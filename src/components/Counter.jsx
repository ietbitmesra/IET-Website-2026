import { useEffect, useRef, useState } from 'react';

function Counter({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState('0');
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = parseInt(value, 10);
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 850, 1);
          setShown(String(Math.round(target * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <strong ref={ref}>
      {shown}
      {value.includes('+') ? ' +'.trim() : ''}
    </strong>
  );
}

export default Counter;
