import { useState } from 'react';
import Arrow from '../../components/Arrow';
import GallerySection from '../../components/GallerySection';
import Navbar from '../../components/Navbar';

function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPath="/gallery" />
      <main>
        <section className="page-hero gallery-hero container">
          <div className="page-hero-content">
            <span className="kicker">IET / GALLERY</span>
            <h1>GALLERY<span className="gallery-hero-period">.</span></h1>
            <p className="gallery-hero-tagline">Moments that <em>bring us together.</em></p>
            <p>
              A look at the people, ideas and experiences shaping engineering at IET BIT Mesra.
              Select an image to see it up close.
            </p>
          </div>
        </section>
        <GallerySection standalone />
      </main>
      <footer className="standalone-footer">
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

export default GalleryPage;
