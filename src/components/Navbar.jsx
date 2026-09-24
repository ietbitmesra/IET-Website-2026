import Logo from './Logo';
import Arrow from './Arrow';

function Navbar({ menuOpen, setMenuOpen, currentPath = '' }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className={menuOpen ? 'open' : ''}>
          <a
            className={`mobile-only-home ${currentPath === '/' ? 'active' : ''}`}
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          {[
            ['About', '/about'],
            ['Events', '/events'],
            ['Resources', '/resources'],
            ['Projects', '/projects'],
            ['Community', '/community'],
          ].map(([x, h]) => (
            <a
              key={x}
              className={currentPath === h ? 'active' : ''}
              href={h}
              onClick={() => setMenuOpen(false)}
            >
              {x}
            </a>
          ))}
          <a className="nav-cta" href="/join" onClick={() => setMenuOpen(false)}>
            Join IET <Arrow />
          </a>
        </nav>
        <button
          className={`menu ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i></i>
          <i></i>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
