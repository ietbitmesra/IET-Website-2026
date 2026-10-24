import { useEffect, useState } from 'react';
import Arrow from '../../../components/Arrow';

const ietLogo = '/assets/shared/iet-bit-mesra.svg';

const heroQuotes = [
  'Build boldly.',
  'Learn by doing.',
  'Code. Create.',
  'Make it real.',
];

function Hero() {
  const [reducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(
    reducedMotion ? heroQuotes[0].length : 0,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const quote = heroQuotes[quoteIndex];

  useEffect(() => {
    if (reducedMotion) return undefined;

    const isQuoteComplete = !isDeleting && characterCount === quote.length;
    const isQuoteEmpty = isDeleting && characterCount === 0;
    const delay = isQuoteComplete ? 2400 : isQuoteEmpty ? 500 : isDeleting ? 55 : 110;

    const timeout = window.setTimeout(() => {
      if (isQuoteComplete) {
        setIsDeleting(true);
      } else if (isQuoteEmpty) {
        setIsDeleting(false);
        setQuoteIndex((index) => (index + 1) % heroQuotes.length);
      } else {
        setCharacterCount((count) => count + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterCount, isDeleting, quote, reducedMotion]);

  return (
    <section className="hero container home-hero">
      <div className="hero-copy">
        <img className="home-hero-mark" src={ietLogo} alt="IET Bit Mesra" />
        <h1 className="reveal-title" aria-label="Learn together. Build boldly.">
          <span className="hero-word">Learn together.</span>
          <br />
          <em className="hero-word home-hero-typing" aria-hidden="true">
            {quote.slice(0, characterCount)}
            <span className="home-hero-cursor"></span>
          </em>
        </h1>
        <p className="hero-text scroll-paragraph-reveal">
          A student-led technical society where BIT Mesra students explore technology through
          hands-on workshops, coding contests, and collaborative projects.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#join">
            Join IET <Arrow />
          </a>
          <a className="text-link" href="#events">
            Explore our events <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
