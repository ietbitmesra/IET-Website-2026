import { useState, useRef, useEffect } from 'react';

const THEME_ICONS = [
  {
    name: 'heart',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    name: 'star',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
      </svg>
    ),
  },
  {
    name: 'terminal',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: 'penguin',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.5 2 8 3.8 8 6.5v4c-1.5.5-3 2-3 4.5 0 2 1.2 3.2 2 3.5-.3 1-.5 2 .5 2.5 1.5.8 3 .5 3.5 0 .3.5.7.5 1 .5s.7 0 1-.5c.5.5 2 .8 3.5 0 1-.5.8-1.5.5-2.5.8-.3 2-1.5 2-3.5 0-2.5-1.5-4-3-4.5v-4C16 3.8 14.5 2 12 2zm-1.5 4a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm-1.5 2.5l1 1.5h-2l1-1.5z" />
      </svg>
    ),
  },
  {
    name: 'code',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'rocket',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    name: 'cpu',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    name: 'coffee',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    name: 'bug',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="8" height="14" rx="4" />
        <path d="M6 13h12" />
        <path d="M4 17h4" />
        <path d="M16 17h4" />
        <path d="M4 9h4" />
        <path d="M16 9h4" />
        <line x1="10" y1="2" x2="8" y2="6" />
        <line x1="14" y1="2" x2="16" y2="6" />
      </svg>
    ),
  },
  {
    name: 'sparkle',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.627 12 12 0-6.627 5.627-12 12-12-6.627 0-12-5.627-12-12z" />
      </svg>
    ),
  },
];

function TuxMascot() {
  const [clickCount, setClickCount] = useState(0);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [isEmojiActive, setIsEmojiActive] = useState(false);
  const [isEmojiLeaving, setIsEmojiLeaving] = useState(false);

  const hideTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 5) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);

      setIsEmojiLeaving(false);
      setIsEmojiActive(true);

      // Disappear after 5s if not clicked again
      hideTimerRef.current = setTimeout(() => {
        setIsEmojiLeaving(true);
        leaveTimerRef.current = setTimeout(() => {
          setIsEmojiActive(false);
          setIsEmojiLeaving(false);
        }, 400);
      }, 5000);

      const iconIndex = (nextCount - 5) % THEME_ICONS.length;
      const current = THEME_ICONS[iconIndex];
      const newFloating = {
        id: Date.now() + Math.random(),
        svg: current.svg,
        offset: (Math.random() - 0.5) * 32,
      };
      setFloatingIcons((prev) => [...prev.slice(-4), newFloating]);
    }
  };

  const currentIcon = isEmojiActive && clickCount >= 5
    ? THEME_ICONS[(clickCount - 5) % THEME_ICONS.length]
    : null;

  return (
    <div
      className="tux-backdrop-wrapper tux-clickable"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Linux Mascot"
    >
      {currentIcon && (
        <div
          key={currentIcon.name + clickCount}
          className={`tux-head-emoji ${isEmojiLeaving ? 'is-leaving' : ''}`}
          aria-hidden="true"
        >
          <span className="tux-emoji-glyph">{currentIcon.svg}</span>
        </div>
      )}

      {floatingIcons.map((item) => (
        <span
          key={item.id}
          className="tux-floating-particle"
          style={{ '--particle-offset': `${item.offset}px` }}
          aria-hidden="true"
        >
          {item.svg}
        </span>
      ))}

      <img src="/tux-outline.svg" alt="Linux Mascot Tux" className="tux-backdrop-img" />
    </div>
  );
}

export default TuxMascot;
