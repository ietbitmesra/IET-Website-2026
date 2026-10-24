import { useState } from 'react';
import Footer from '../../components/Footer';
import GallerySection from '../../components/GallerySection';
import Navbar from '../../components/Navbar';
import PastEvents from '../../components/PastEvents';
import FAQ from './components/FAQ';
import About from './components/About';
import Hero from './components/Hero';
import JoinCTA from './components/JoinCTA';
import StatsStrip from './components/StatsStrip';
import Ticker from './components/Ticker';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div id="top" className="home-page">
      <div className="scroll-progress" aria-hidden="true"></div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPath="/" />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Ticker />
        <section className="section container section-reveal" id="events">
          <PastEvents landing />
        </section>
        <GallerySection />
        <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
