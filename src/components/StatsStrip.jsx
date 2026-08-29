import Counter from './Counter';
import { statData } from '../data/stats';

function StatsStrip() {
  return (
    <section className="stats container scroll-reveal" aria-label="IET statistics">
      {statData.map(([n, l, v]) => (
        <div className="stat" key={l}>
          <span className="stat-no">{n}</span>
          <div>
            <Counter value={v} />
            <small>{l}</small>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsStrip;
