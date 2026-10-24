import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Arrow from './Arrow';
import { galleryArchiveItems } from '../pages/gallery/data/gallery';

const PAGE_SIZE = 25;

function GallerySection({ standalone = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(standalone ? PAGE_SIZE : galleryArchiveItems.length);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const isPointerDown = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const rafId = useRef(null);
  const items = galleryArchiveItems;
  const isOpen = activeIndex !== null;

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const nextLeft = scrollLeft > 4;
    const nextRight = scrollLeft < scrollWidth - clientWidth - 4;
    setCanScrollLeft((prev) => (prev !== nextLeft ? nextLeft : prev));
    setCanScrollRight((prev) => (prev !== nextRight ? nextRight : prev));
  };

  useEffect(() => {
    if (standalone) return undefined;
    const slider = sliderRef.current;
    if (!slider) return undefined;

    updateScrollButtons();
    slider.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      slider.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [standalone]);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 300;
    const distance = (cardWidth + 16) * 2;
    sliderRef.current.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (e) => {
    if (standalone || (e.button !== 0 && e.button !== undefined)) return;
    isPointerDown.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftPos.current = sliderRef.current.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeftPos.current - walk;
          }
          rafId.current = null;
        });
      }
    }
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const handleImageLoad = (e) => {
    const img = e.currentTarget;
    if (!img) return;
    if (img.naturalWidth && img.naturalHeight && img.naturalWidth / img.naturalHeight < 0.92) {
      img.classList.add('is-portrait');
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((index) =>
          index !== null && index < items.length - 1 ? index + 1 : index,
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((index) =>
          index !== null && index > 0 ? index - 1 : index,
        );
      } else if (event.key === 'Tab') {
        const controls = Array.from(dialogRef.current?.querySelectorAll('button:not(:disabled)') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, items]);

  const sectionClass = standalone
    ? 'gallery-section gallery-page-body page-body container'
    : 'gallery-section section container section-reveal';

  return (
    <>
      <section className={sectionClass} id={standalone ? undefined : 'gallery'}>
        {!standalone && (
          <div className="section-head gallery-preview-head">
            <div>
              <span className="kicker">04 / GALLERY</span>
              <h2 className="reveal-title gallery-preview-title">
                GALLERY<span className="gallery-hero-period">.</span>
              </h2>
              <p className="gallery-home-tagline">
                Moments that <em>bring us together.</em>
              </p>
            </div>
            <div className="gallery-preview-nav">
              <button
                type="button"
                className="gallery-nav-btn gallery-nav-prev"
                onClick={() => scrollSlider('prev')}
                disabled={!canScrollLeft}
                aria-label="Previous gallery images"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-nav-btn gallery-nav-next"
                onClick={() => scrollSlider('next')}
                disabled={!canScrollRight}
                aria-label="Next gallery images"
              >
                ›
              </button>
              <a className="text-link" href="/gallery">
                View the gallery <Arrow />
              </a>
            </div>
          </div>
        )}
        {standalone && (
          <div className="gallery-archive-head">
            <div>
              <span className="kicker">THE ARCHIVE / {items.length} FRAMES</span>
              <h2>Inside the chapter.</h2>
            </div>
          </div>
        )}

        {standalone ? (
          <div className="chapter-gallery-grid">
            {items.slice(0, visibleCount).map((item, index) => (
              <button
                className="chapter-gallery-card"
                key={item.id ?? item.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${item.title} image`}
              >
                <span className="chapter-gallery-image">
                  <img
                    className={item.isPortrait ? 'is-portrait' : undefined}
                    src={item.thumbnail || item.image}
                    alt={item.alt}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={handleImageLoad}
                  />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className="gallery-slider-track"
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {items.map((item, index) => (
              <button
                className="chapter-gallery-card gallery-slider-card"
                key={item.id ?? `${item.image}-${index}`}
                type="button"
                onClick={() => {
                  if (!hasMoved.current) {
                    setActiveIndex(index);
                  }
                }}
                aria-label={`View ${item.title} image`}
              >
                <span className="chapter-gallery-image">
                  <img
                    className={item.isPortrait ? 'is-portrait' : undefined}
                    src={item.thumbnail || item.image}
                    alt={item.alt}
                    loading={index < 5 ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={handleImageLoad}
                  />
                </span>
              </button>
            ))}
          </div>
        )}

        {standalone && visibleCount < items.length && (
          <div className="gallery-load-more">
            <span>Showing {visibleCount} of {items.length} frames</span>
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => Math.min(count + PAGE_SIZE, items.length))
              }
            >
              Load more photos <Arrow />
            </button>
          </div>
        )}
      </section>

      {activeIndex !== null && createPortal(
        <div className="gallery-lightbox" role="presentation" onClick={() => setActiveIndex(null)}>
          <div
            ref={dialogRef}
            className="gallery-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${items[activeIndex].title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <span className="gallery-lightbox-counter">
              {activeIndex + 1} / {items.length}
            </span>
            <button
              ref={closeButtonRef}
              className="gallery-lightbox-close"
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              ×
            </button>
            <button
              className="gallery-lightbox-nav gallery-lightbox-previous"
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index > 0 ? index - 1 : index))
              }
              disabled={activeIndex === 0}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="gallery-lightbox-stage">
              <img
                className="gallery-lightbox-image"
                src={items[activeIndex].image}
                alt={items[activeIndex].alt}
                decoding="async"
              />
            </div>
            <button
              className="gallery-lightbox-nav gallery-lightbox-next"
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index < items.length - 1 ? index + 1 : index))
              }
              disabled={activeIndex === items.length - 1}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

export default GallerySection;
