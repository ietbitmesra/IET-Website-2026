import { pastEvents } from '../data/events';

function PastEvents() {
  return (
    <section className="past-events">
      <div className="past-events-head">
        <div>
          <span className="kicker">ARCHIVE / PAST EVENTS</span>
          <h3>
            What we've
            <br />
            <em>already built.</em>
          </h3>
        </div>
        <span className="archive-count">05 / ARCHIVED</span>
      </div>
      <div className="poster-grid">
        {pastEvents.map((event, index) => (
          <article
            className={`poster-card poster-${event.theme} reveal-on-scroll`}
            style={{ '--poster-delay': `${index * 90}ms` }}
            key={event.title}
          >
            <div className="poster-art">
              <img
                src={event.image}
                alt={`${event.title} event poster`}
                loading="lazy"
                onError={(e) => e.currentTarget.classList.add('missing')}
              />
              <div className="poster-fallback">
                <span>IET / BIT MESRA</span>
                <strong>{event.title}</strong>
                <small>{event.type}</small>
              </div>
              <span className="poster-index">0{index + 1}</span>
            </div>
            <div className="poster-info">
              <div>
                <h4>{event.title}</h4>
                <p>{event.type}</p>
              </div>
              <span>{event.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PastEvents;
