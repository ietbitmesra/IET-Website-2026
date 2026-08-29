import Arrow from './Arrow';
import { toolchain, orbit, orbitRadius, orbitalVelocity } from '../data/toolchain';

function Toolchain() {
  const magnet = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
    e.currentTarget.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty('--tx', '0px');
    e.currentTarget.style.setProperty('--ty', '0px');
  };
  return (
    <section className="toolchain container scroll-reveal">
      <div className="toolchain-head">
        <span className="kicker">05 / DEVELOPER ECOSYSTEM</span>
        <p>
          Where ideas become
          <br />
          <em>systems.</em>
        </p>
        <small>
          ACTIVE ECOSYSTEM / {String(toolchain.length).padStart(2, '0')}
          <br />
          CIRCULAR ORBIT / p {orbit.p} / r {orbitRadius} / v {orbitalVelocity.toFixed(3)}
        </small>
      </div>
      <div className="ecosystem-canvas" style={{ '--orbit-radius': `${orbitRadius}px` }}>
        <div className="ecosystem-center">
          <span>IET</span>
          <small>BUILD / CONNECT</small>
        </div>
        <div className="orbit-ring" aria-hidden="true"></div>
        <div className="toolchain-grid orbit-layout">
          {toolchain.map(([slug, name, meta, category, url], i) => (
            <a
              className={`tool-logo interactive-card category-${category}`}
              href={url}
              target="_blank"
              rel="noreferrer"
              onPointerMove={magnet}
              onPointerLeave={reset}
              style={{
                '--delay': `${i * 65}ms`,
                '--orbit-angle': `${(i * 360) / toolchain.length}deg`,
              }}
              key={name}
            >
              <div className="logo-frame">
                <img
                  src={`https://cdn.simpleicons.org/${slug}/d6ff3f`}
                  alt={`${name} logo`}
                  loading="lazy"
                />
              </div>
              <span className="tool-name">{name}</span>
              <span className="tool-meta">{meta}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Toolchain;
