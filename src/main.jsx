import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles.css';

import { events } from './data/events';
import { resources } from './data/resources';

import Arrow from './components/Arrow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import Toolchain from './components/Toolchain';
import Ticker from './components/Ticker';
import EventList from './components/EventList';
import PastEvents from './components/PastEvents';
import Leaderboard from './components/Leaderboard';
import ResourceGrid from './components/ResourceGrid';
import About from './components/About';
import JoinCTA from './components/JoinCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StandalonePage from './pages/StandalonePage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        '--scroll-progress',
        `${max > 0 ? (window.scrollY / max) * 100 : 0}%`,
      );
      const art = document.querySelector('.hero-art');
      if (art && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        art.style.setProperty('--parallax', `${Math.min(window.scrollY * 0.06, 24)}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]');
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href === '/') return;
      e.preventDefault();
      window.history.pushState({}, '', href);
      setPath(href);
      window.scrollTo(0, 0);
    };
    links.forEach((link) => link.addEventListener('click', handleClick));
    return () => links.forEach((link) => link.removeEventListener('click', handleClick));
  }, [path]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('.reveal-on-scroll, .scroll-reveal, .section-reveal');
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          }),
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
      );
      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [path]);
  if (path !== '/') return <StandalonePage path={path} />;
  return (
    <div id="top">
      <div className="scroll-progress" aria-hidden="true"></div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <StatsStrip />
        <Toolchain />
        <Ticker />
        <section className="section container section-reveal" id="events">
          <div className="section-head">
            <div>
              <span className="kicker">02 / ACTIVITY</span>
              <h2 className="reveal-title">
                Things worth
                <br />
                <em>showing up</em> for.
              </h2>
            </div>
            <a className="text-link" href="/events">
              View all events <Arrow />
            </a>
          </div>
          <EventList items={events} />
          <PastEvents />
        </section>
        <Leaderboard />
        <section className="section container section-reveal" id="resources">
          <div className="section-head">
            <div>
              <span className="kicker">04 / RESOURCE VAULT</span>
              <h2 className="reveal-title">
                Learn in public.
                <br />
                <em>Keep going.</em>
              </h2>
            </div>
            <a className="text-link" href="/resources">
              Open the vault <Arrow />
            </a>
          </div>
          <ResourceGrid items={resources} />
        </section>
        <About />
        <JoinCTA />
        <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
      </main>
      <Footer />
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />);
