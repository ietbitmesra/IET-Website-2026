import { useEffect, useRef, useState } from 'react';
import { MemberCard } from './TeamSection';

function ExecutiveTree({ members, rowLabel, onSelect }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const updateControls = () => {
      setCanScrollLeft(track.scrollLeft > 8);
      setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    };
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    track.addEventListener('scroll', updateControls, { passive: true });
    updateControls();

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', updateControls);
    };
  }, [members]);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <div className="team-carousel">
      <div className="executive-team-grid" ref={trackRef}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onSelect={onSelect} />
        ))}
      </div>
      <div className="team-carousel-controls" aria-label={`${rowLabel} member navigation`}>
        <button
          type="button"
          className="team-carousel-arrow"
          aria-label={`Scroll ${rowLabel} members left`}
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="team-carousel-arrow"
          aria-label={`Scroll ${rowLabel} members right`}
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default ExecutiveTree;
