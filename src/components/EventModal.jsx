import { useEffect } from 'react';

function EventModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
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
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close event details">
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