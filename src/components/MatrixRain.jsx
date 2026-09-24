import { useEffect, useRef } from 'react';

const KATAKANA =
  'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
const SYMBOLS = '<>{}/=+-*%&$#@!?:;~';
const DEFAULT_ALPHABET = KATAKANA + LATIN + NUMS + SYMBOLS;

function MatrixRain({
  fontSize = 14,
  colSpacing = 22,
  color = 'rgba(167, 139, 250, 0.38)',
  headColor = 'rgba(216, 180, 254, 0.70)',
  fps = 18,
  className = '',
  alphabet = DEFAULT_ALPHABET,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isVisible = true;
    let lastTime = 0;
    const interval = 1000 / fps;

    let width = 0;
    let height = 0;
    let rainDrops = [];

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 600;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set transform for DPI
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Pre-fill full canvas background cleanly
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#0b0d0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      const numCols = Math.floor(width / colSpacing);
      const prevDrops = [...rainDrops];
      rainDrops = new Array(numCols);

      const maxRows = Math.ceil(height / fontSize);
      for (let i = 0; i < numCols; i++) {
        if (i < prevDrops.length && prevDrops[i] !== undefined) {
          rainDrops[i] = prevDrops[i];
        } else {
          // Stagger starting positions with generous gaps for low density
          rainDrops[i] = Math.floor(Math.random() * maxRows * 1.8) - Math.floor(maxRows * 0.8);
        }
      }
    };

    setupCanvas();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      // Clear/fade the entire canvas smoothly using raw pixel dimensions
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = 'rgba(11, 13, 15, 0.10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.font = `${fontSize}px "DM Mono", monospace, "Courier New"`;

      for (let i = 0; i < rainDrops.length; i++) {
        const row = rainDrops[i];
        const xPos = i * colSpacing + Math.floor((colSpacing - fontSize) / 2);
        const yPos = row * fontSize;

        // Draw character only when on screen
        if (row >= 0 && yPos <= height + fontSize) {
          // Dim trail character
          if (row > 1) {
            const trailChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillStyle = color;
            ctx.fillText(trailChar, xPos, (row - 1) * fontSize);
          }

          // Subtle head character
          const headChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          ctx.fillStyle = headColor;
          ctx.fillText(headChar, xPos, yPos);
        }

        // When drop passes below the bottom, pause before next descent for lower density
        if (yPos > height) {
          if (yPos > height + 50 || Math.random() > 0.4) {
            rainDrops[i] = -Math.floor(15 + Math.random() * 45);
          }
        }

        rainDrops[i]++;
      }
    };

    // If reduced motion is requested, render a single frame
    if (prefersReducedMotion) {
      draw();
      return () => {
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
      };
    }

    const animate = (time) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = time - lastTime;
      if (elapsed < interval) return;
      lastTime = time - (elapsed % interval);

      draw();
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [fontSize, colSpacing, color, headColor, fps, alphabet]);

  return (
    <div ref={containerRef} className={`matrix-rain-wrapper ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="matrix-rain-canvas" />
    </div>
  );
}

export default MatrixRain;
