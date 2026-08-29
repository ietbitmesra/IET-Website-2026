import Logo from './Logo';
import Arrow from './Arrow';

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className={menuOpen ? 'open' : ''}>
          {[
            ['About', '/about'],
            ['Events', '/events'],
            ['Resources', '/resources'],
            ['Projects', '/projects'],
            ['Community', '/community'],
          ].map(([x, h]) => (
            <a key={x} href={h} onClick={() => setMenuOpen(false)}>
              {x}
            </a>
          ))}
          <a className="nav-cta" href="/join">
            Join IET <Arrow />
          </a>
        </nav>
        <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <i></i>
          <i></i>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
