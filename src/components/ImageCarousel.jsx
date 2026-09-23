import { useRef, useEffect, useCallback, useState } from 'react';
import Arrow from './Arrow';

const gallerySlides = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    label: 'SPLIT SOLVE, 2026',
    size: 'small',
    offset: 'top',
  },
  {
    src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    label: 'C++ WORKSHOP, 2026',
    size: 'large',
    offset: 'center',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    label: 'SWE QUEST, 2026',
    size: 'small',
    offset: 'bottom',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    label: 'REWIND RECODE, 2026',
    size: 'medium',
    offset: 'top',
  },
  {
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    label: 'BLIND CODING, 2026',
    size: 'large',
    offset: 'center',
  },
];

// Duplicate for seamless loop
const items = [...gallerySlides, ...gallerySlides, ...gallerySlides, ...gallerySlides];

// Width varies by size: small=240, medium=280, large=340, expanded=385, + 60px gap
const getSlideWidth = (size, isExpanded = false) => {
  if (isExpanded) return 385;
  if (size === 'large') return 340;
  if (size === 'medium') return 280;
  return 240;
};
const GAP = 60;
const singleSetWidth = gallerySlides.reduce((sum, s) => sum + getSlideWidth(s.size) + GAP, 0);

function ImageCarousel() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const trackRef = useRef(null);
  const isInteracting = useRef(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const pointerDownPos = useRef({ x: 0, y: 0, time: 0 });
  const lastToggledTime = useRef(0);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const resumeTimer = useRef(null);

  const pauseAutoPlay = useCallback(() => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const resumeAutoPlay = useCallback((delay = 1500) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, delay);
  }, []);

  const toggleExpand = useCallback((index) => {
    const now = Date.now();
    if (now - lastToggledTime.current < 250) return;
    if (hasDragged.current) return;
    lastToggledTime.current = now;
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft = singleSetWidth;

    let animationFrameId;
    const autoScroll = () => {
      if (!isInteracting.current && track) {
        track.scrollLeft += 0.6;

        if (track.scrollLeft >= singleSetWidth * 2) {
          track.scrollLeft -= singleSetWidth;
        } else if (track.scrollLeft <= 0) {
          track.scrollLeft += singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollLeft >= singleSetWidth * 2.5) {
      track.scrollLeft -= singleSetWidth;
    } else if (track.scrollLeft <= singleSetWidth * 0.2) {
      track.scrollLeft += singleSetWidth;
    }
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.button !== undefined) return;
    isDragging.current = true;
    hasDragged.current = false;
    pauseAutoPlay();
    startX.current = e.clientX;
    pointerDownPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    startScrollLeft.current = trackRef.current ? trackRef.current.scrollLeft : 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 6) {
      if (!hasDragged.current) {
        hasDragged.current = true;
        try {
          trackRef.current.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      trackRef.current.scrollLeft = startScrollLeft.current - delta;
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (hasDragged.current && trackRef.current) {
      try {
        trackRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    resumeAutoPlay(1500);
  };

  const scrollPrev = () => {
    setExpandedIndex(null);
    pauseAutoPlay();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
    resumeAutoPlay(2000);
  };

  const scrollNext = () => {
    setExpandedIndex(null);
    pauseAutoPlay();
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
    resumeAutoPlay(2000);
  };

  return (
    <div className="gallery-carousel section-reveal">
      <div className="gallery-viewport">
        <div
          className={`gallery-track ${expandedIndex !== null ? 'has-expanded' : ''}`}
          ref={trackRef}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {items.map((slide, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                className={`gallery-item gallery-item--${slide.size} gallery-item--${slide.offset} ${
                  isExpanded ? 'is-expanded' : ''
                }`}
                key={index}
                style={{ width: getSlideWidth(slide.size, isExpanded) }}
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={() => {
                  if (expandedIndex === index) {
                    setExpandedIndex(null);
                  }
                  resumeAutoPlay(400);
                }}
                onPointerUp={(e) => {
                  const dist = Math.hypot(
                    e.clientX - pointerDownPos.current.x,
                    e.clientY - pointerDownPos.current.y
                  );
                  if (dist < 8 && !hasDragged.current) {
                    toggleExpand(index);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(index);
                }}
              >
                <span className="gallery-label">{slide.label}</span>
                <div className="gallery-frame">
                  <img
                    src={slide.src}
                    alt={slide.label}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={scrollPrev} className="carousel-btn" aria-label="Previous" type="button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button onClick={scrollNext} className="carousel-btn" aria-label="Next" type="button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <a href="/gallery" className="carousel-gallery-btn" aria-label="View Gallery">
          <span>Gallery</span>
          <Arrow />
        </a>
      </div>
    </div>
  );
}

export default ImageCarousel;
