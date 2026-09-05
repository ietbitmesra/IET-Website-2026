import Logo from '../components/Logo';
import Arrow from '../components/Arrow';
import { pageContent } from '../data/pages';

function StandalonePage({ path }) {
  const [label, title, desc] = pageContent[path] || pageContent['/about'];

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Logo />
          <nav className="open">
            {[
              ['About', '/about'],
              ['Events', '/events'],
              ['Resources', '/resources'],
              ['Projects', '/projects'],
              ['Community', '/community'],
            ].map(([x, h]) => (
              <a key={x} className={path === h ? 'active' : ''} href={h}>
                {x}
              </a>
            ))}
            <a className="nav-cta" href="/join">
              Join IET <Arrow />
            </a>
          </nav>
          <a className="mobile-back" href="/">
            Home
          </a>
        </div>
      </header>
      <main>
        <section className={`page-hero container ${path === '/about' ? 'page-hero-about' : ''}`}>
          <div className="page-hero-content">
            <span className="kicker">IET / {label}</span>
            <h1>{title}</h1>
            <p>{desc}</p>
          </div>
          {path === '/about' && (
            <div className="page-hero-art" aria-hidden="true">
              <img src="/about-hands.png" alt="IET Connection" />
            </div>
          )}
        </section>
        <section className="page-body container">
          {path === '/about' ? (
            <>
              <span className="kicker">CHAPTER INITIATIVES</span>
              <h2>
                What we <em>do??</em>
              </h2>
              <p>
                At the IET BIT Mesra Student Chapter, we build practical problem-solving and
                technical proficiency through focused C++ workshops and dynamic campus competitions.
                From high-pressure programming challenges like <strong>Rewind Recode</strong> and{' '}
                <strong>Blind Coding</strong> to collaborative problem-solving in{' '}
                <strong>Split Solve</strong> and end-to-end interview simulations with{' '}
                <strong>SWE Quest</strong>, we provide platforms that test logic under real-world
                constraints.
              </p>
              <p>
                Our core mission is bridging the gap between foundational data structures and
                competitive execution, empowering students to sharpen their algorithmic skills and
                excel in software engineering.
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '30px', flexWrap: 'wrap' }}>
                <a className="button primary" href="/events">
                  Explore Events <Arrow />
                </a>
                <a className="button outline" href="/">
                  Back to home <Arrow />
                </a>
              </div>
            </>
          ) : (
            <>
              <span className="kicker">STATIC FRONTEND PREVIEW</span>
              <h2>
                Built for the next
                <br />
                <em>chapter.</em>
              </h2>
              <p>
                Content for this route is ready to connect to the IET API in a later phase. For now,
                this presentation layer keeps the hierarchy, interaction and responsive behavior in
                place.
              </p>
              <a className="button outline" href="/">
                Back to home <Arrow />
              </a>
            </>
          )}
        </section>
      </main>
      <footer>
        <div className="container footer-bottom">
          <span>© 2026 IET Club</span>
          <span>
            Built by the IET Developer Team <Arrow />
          </span>
        </div>
      </footer>
    </>
  );
}

export default StandalonePage;
