import Arrow from './Arrow';

function ResourceGrid({ items }) {
  return (
    <div className="resource-grid">
      {items.map((r) => (
        <a href="/resources" className="resource interactive-card reveal-on-scroll" key={r.no}>
          <span className="resource-no">{r.no}</span>
          <div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <small>{r.count}</small>
          </div>
          <Arrow />
        </a>
      ))}
    </div>
  );
}

export default ResourceGrid;
