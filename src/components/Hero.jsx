import Arrow from './Arrow';

function Hero() {
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty(
      '--identity-x',
      `${Math.max(-8, Math.min(8, ((e.clientX - r.left - r.width / 2) / r.width) * 16))}px`,
    );
    e.currentTarget.style.setProperty(
      '--identity-y',
      `${Math.max(-8, Math.min(8, ((e.clientY - r.top - r.height / 2) / r.height) * 16))}px`,
    );
  };

  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="pulse"></span>IET CLUB / DEVELOPER COMMUNITY{' '}
          <span className="year">2026</span>
        </div>
        <h1 className="reveal-title">
          Engineering minds.
          <br />
          <em>Building</em> what's next.
        </h1>
        <p className="hero-text">
          A student-led engineering community for people who learn by building, competing and
          collaborating.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#join">
            Join the community <Arrow />
          </a>
          <a className="text-link" href="#events">
            Explore what we do <Arrow />
          </a>
        </div>
      </div>
      <div
        className="hero-art"
        onMouseMove={spotlight}
        aria-label="IET identity and developer network"
      >
        <div className="crosshair c1"></div>
        <div className="crosshair c2"></div>
        <div className="grid-label">
          RANCHI / INDIA
          <br />
          <span>23.3441° N&nbsp;&nbsp;85.3096° E</span>
        </div>
        <div className="hero-identity">
          <span className="identity-overline">EST. 2019 / BIT MESRA</span>
          <strong>IET</strong>
          <span className="identity-caption">
            ENGINEERING
            <br />
            INNOVATION
            <br />
            TOGETHER
          </span>
          <i></i>
        </div>
        <div className="diagram">
          <div className="node n1"></div>
          <div className="node n2"></div>
          <div className="node n3"></div>
          <div className="node n4"></div>
          <svg viewBox="0 0 400 340">
            <path d="M55 250 L140 150 L220 190 L320 65 M140 150 L305 285 M220 190 L320 65" />
          </svg>
        </div>
        <div className="art-caption">
          01 / IDENTITY
          <br />
          <span>Curiosity into craft</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
