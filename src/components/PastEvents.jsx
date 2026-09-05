import { pastEvents } from '../data/events';

function PastEvents({ splitWorkshops = false, onLearnMore }) {
  const renderPoster = (event, index) => (
    <div className={`poster-art poster-${event.theme || 'placeholder'}`}>
      {event.image ? (
        <img
          src={event.image}
          alt={`${event.title} event poster`}
          loading="lazy"
          onError={(e) => e.currentTarget.classList.add('missing')}
        />
      ) : null}
      <div className="poster-fallback">
        <strong>{event.title}</strong>
        <small>{event.type}</small>
      </div>
      <span className="poster-index">0{index + 1}</span>
    </div>
  );

  const renderDetails = (items, label, title) => (
    <section className="event-details-group">
      <div className="event-details-heading">
        <span className="kicker">ARCHIVE / {label}</span>
        <h2>
          {title[0]}
          <br />
          <em>{title[1]}</em>
        </h2>
      </div>
      <div className="event-details-list horizontal-scroll">
        {items.map((event, index) => (
          <article
            className="event-detail-card interactive-card reveal-on-scroll"
            key={event.title}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`View details for ${event.title}`}
            onClick={() => onLearnMore && onLearnMore(event)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLearnMore && onLearnMore(event);
              }
            }}
          >
            {renderPoster(event, index)}
            <div className="event-detail-copy">
              <span className="event-detail-number">EVENT / 0{index + 1}</span>
              <h3>{event.title}</h3>
              <p className="event-detail-type">{event.type}</p>
              <div className="event-detail-rule"></div>
              <p className="event-detail-info">{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderArchive = (items, label, title, count) => (
    <section className="past-events">
      <div className="past-events-head">
        <div>
          <span className="kicker">ARCHIVE / {label}</span>
          <h3>
            {title[0]}
            <br />
            <em>{title[1]}</em>
          </h3>
        </div>
        <span className="archive-count">{count} / ARCHIVED</span>
      </div>
      <div className="poster-grid">
        {items.map((event, index) => (
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

  const renderWorkshopFeature = (workshop) => {
    if (!workshop) return null;

    return (
      <section className="event-details-group workshop-feature-group">
        <div className="event-details-heading">
          <span className="kicker">ARCHIVE / WORKSHOPS</span>
          <h2>
            Hands-on
            <br />
            <em>sessions.</em>
          </h2>
        </div>

        <div className="workshop-feature-container">
          <div className="workshop-feature-main">
            <div className="workshop-feature-title-block">
              <h3 className="workshop-feature-heading">{workshop.title}</h3>
              <div className="workshop-title-accent" />
            </div>

            <div className="workshop-feature-card">
              <p className="workshop-paragraph">
                {workshop.description1 ||
                  'This is a three day workshop organized by IET every year and has been one of the major workshops conducted by the club. As C++ provides an introduction to programming, the workshop attracts first year students in large numbers. The topics are covered in brief and taught with the help of PowerPoint presentations and practical examples by senior students of the club. The learners can clarify their doubts by asking their queries to the student volunteers of IET.'}
              </p>
              <p className="workshop-paragraph">
                {workshop.description2 ||
                  'Some of the topics covered include operators, loops, arrays and pointers. The workshop is designed to give beginners a strong foundation in C++ programming and help them understand the fundamentals of programming in a practical and approachable way.'}
              </p>

              {workshop.topics && workshop.topics.length > 0 && (
                <div className="workshop-topics-strip">
                  <span className="workshop-topics-label">KEY TOPICS:</span>
                  <div className="workshop-topics-list">
                    {workshop.topics.map((topic) => (
                      <span className="workshop-topic-badge" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="workshop-feature-sidebar">
            <div className="workshop-stat-card">
              <div className="workshop-stat-item">
                <span className="workshop-stat-number">{workshop.durationDays || '3'}</span>
                <span className="workshop-stat-label">{workshop.durationLabel || 'DAYS DURATION'}</span>
              </div>

              <div className="workshop-stat-separator" />

              <div className="workshop-stat-item">
                <span className="workshop-stat-highlight">{workshop.track || 'C / C++'}</span>
                <span className="workshop-stat-label">{workshop.trackLabel || 'PROGRAMMING'}</span>
              </div>

              <div className="workshop-stat-separator" />

              <div className="workshop-stat-item">
                <span className="workshop-stat-highlight">{workshop.level || 'BEGINNER'}</span>
                <span className="workshop-stat-highlight sub-highlight">{workshop.levelSub || 'FOCUSED'}</span>
              </div>

              <div className="workshop-stat-separator" />

              <div className="workshop-stat-item workshop-meta-item">
                <span className="workshop-meta-date">{workshop.dates || '16–18 JAN 2026'}</span>
                <span className="workshop-meta-venue">{workshop.venue || 'ROOMS 214, 219, 220'}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  };

  if (splitWorkshops) {
    const workshop = pastEvents.find((event) => event.type === 'Workshop');
    const events = pastEvents.filter((event) => event.type !== 'Workshop');

    return (
      <div className="past-events-groups event-details-page">
        {renderDetails(events, 'PAST EVENTS', ["What we've", 'already built.'])}
        {renderWorkshopFeature(workshop)}
      </div>
    );
  }

  return (
    renderArchive(pastEvents, 'PAST EVENTS', ["What we've", 'already built.'], '05')
  );
}

export default PastEvents;
