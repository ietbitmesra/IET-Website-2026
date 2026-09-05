import { useEffect, useRef } from 'react';

function EventModal({ event, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!event) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previouslyFocusedElement = document.activeElement;

    // Prevent layout shift from disappearing scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    // Focus the modal close button for keyboard / screen-reader accessibility
    setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 50);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener('keydown', onKeyDown);

      // Restore focus to the element that triggered the modal
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div className="event-modal" role="presentation" onMouseDown={onClose}>
      <div
        className="event-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-dialog-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close event details"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="dialog-index">IET / EVENT FILE / {event.day || 'ARCHIVE'}</div>
        <div className="dialog-type">{event.type}</div>
        <h2 id="event-dialog-title">{event.title}</h2>
        <p className="dialog-summary">
          {event.summary || 'The full event brief will be added here with more information about this IET event.'}
        </p>
        <div className="dialog-meta">
          <div><span>When</span><strong>{event.date || event.detail}</strong></div>
          <div><span>Where</span><strong>{event.location || 'IET / BIT MESRA'}</strong></div>
          <div><span>Format</span><strong>{event.format || event.type}</strong></div>
        </div>
        <div className="dialog-section">
          <span className="kicker">CURRENTLY PLANNED</span>
          <ul>
            {(event.details || [event.detail]).map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <button className="button primary dialog-action" type="button" onClick={onClose}>
          {event.action ? event.action.replace(' ↗', '') : 'Close details'} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}

export default EventModal;