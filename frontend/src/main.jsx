import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

import EventsPage from './pages/events/EventsPage';
import GalleryPage from './pages/gallery/GalleryPage';
import HomePage from './pages/home/HomePage';
import StandalonePage from './pages/standalone/StandalonePage';
import TeamPage from './pages/team/TeamPage';
import JoinIetPage from './pages/join/JoinIetPage';

const replacedPagePaths = new Set(['/resources', '/projects', '/community']);

function getCurrentPath() {
  const currentPath = window.location.pathname;
  return replacedPagePaths.has(currentPath) ? '/gallery' : currentPath;
}

function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = max > 0 ? window.scrollY / max : 0;
      const hero = document.querySelector('.hero');
      document.documentElement.style.setProperty('--scroll-progress', `${scrollRatio * 100}%`);
      document.documentElement.style.setProperty('--scroll-ratio', scrollRatio.toFixed(3));
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      const art = document.querySelector('.hero-art');
      if (hero && art && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const heroProgress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
        hero.style.setProperty('--hero-progress', heroProgress.toFixed(3));
        art.style.setProperty('--parallax', `${heroProgress * -34}px`);
        art.style.setProperty('--art-scale', `${1 + heroProgress * 0.045}`);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateScrollState();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (path !== window.location.pathname) {
      window.history.replaceState({}, '', path);
    }
    const sync = () => setPath(getCurrentPath());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [path]);
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]');
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href || href.startsWith('/#')) return;
      const destination = replacedPagePaths.has(href) ? '/gallery' : href;
      e.preventDefault();
      window.history.pushState({}, '', destination);
      setPath(destination);
      window.scrollTo(0, 0);
    };
    links.forEach((link) => link.addEventListener('click', handleClick));
    return () => links.forEach((link) => link.removeEventListener('click', handleClick));
  }, [path]);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia('(max-width: 760px)').matches;
    let lenis = null;
    let tick = null;
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.hero-word,.hero-art,.hero-copy', { clearProps: 'all' });
        return;
      }

      lenis = smallScreen
        ? null
        : new Lenis({
          duration: 1.2,
          easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
          smoothWheel: true,
        });
      tick = (time) => {
        if (!lenis) return;
        const elapsed = time * 1000;
        lenis.raf(elapsed);
      };
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      gsap.from('.hero-word', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.2,
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray('.section,.toolchain,.activity,.join').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      gsap.utils.toArray('.hero-art,.about-mark,.hero-identity-image').forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      const progress = document.querySelector('.scroll-progress');
      if (progress) {
        progress.style.width = '100%';
        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
        gsap.to(progress, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true },
        });
      }
    });
    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove(tick);
      }
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [path]);
  useEffect(() => {
    let observer = null;
    const timer = setTimeout(() => {
      const items = document.querySelectorAll(
        '.reveal-on-scroll, .scroll-reveal, .section-reveal, .scroll-paragraph-reveal, ' +
        '.section-head, .about-copy > p, .join p, .faq-list, .activity-inner > div:first-child',
      );
      if (!items.length) return;
      if (!('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
      }
      const paragraphs = document.querySelectorAll('.scroll-paragraph-reveal');
      const paragraphMotions = ['up', 'left', 'right', 'scale'];
      paragraphs.forEach((paragraph, index) => {
        paragraph.dataset.revealMotion = paragraphMotions[index % paragraphMotions.length];
      });
      items.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
      });
      observer = new IntersectionObserver(
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
    }, 60);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [path]);
  if (path === '/events') return <EventsPage />;
  if (path === '/team') return <TeamPage />;
  if (path === '/gallery') return <GalleryPage />;
  if (path === '/join') return <JoinIetPage />;
  if (path !== '/') return <StandalonePage path={path} />;
  return <HomePage />;
}
createRoot(document.getElementById('root')).render(<App />);
