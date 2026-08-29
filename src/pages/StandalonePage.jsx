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
        <section className="page-hero container">
          <span className="kicker">IET / {label}</span>
          <h1>{title}</h1>
          <p>{desc}</p>
        </section>
        <section className="page-body container">
          <div className="page-rule"></div>
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
