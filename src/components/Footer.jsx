import Logo from './Logo';
import Arrow from './Arrow';

function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Building a stronger engineering community through code, collaboration and curiosity.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <small>EXPLORE</small>
            <a href="#about">About</a>
            <a href="#events">Events</a>
            <a href="#resources">Resources</a>
            <a href="#join">Join IET</a>
          </div>
          <div>
            <small>CONNECT</small>
            <a href="#top">GitHub</a>
            <a href="#top">LinkedIn</a>
            <a href="mailto:hello@ietclub.in">Email us</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 IET Club</span>
        <span>
          Built by the IET Developer Team <Arrow />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
