function EventList({ items }) {
  return (
    <div className="event-list">
      {items.map((e) => (
        <article className="event interactive-card reveal-on-scroll" key={e.title}>
          <div className="date">
            <b>{e.day}</b>
            <span>{e.month}</span>
          </div>
          <div className="event-main">
            <h3>{e.title}</h3>
            <p>{e.meta}</p>
          </div>
          <div className="event-desc">{e.desc}</div>
          <a href="/join" className="event-action">
            {e.action}
          </a>
        </article>
      ))}
    </div>
  );
}

export default EventList;
