import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const events = [
  {
    day: '30',
    month: 'AUG',
    title: 'Web Development Workshop',
    meta: '5:00 PM · Innovation Lab',
    desc: 'Learn · Build · Deploy',
    action: 'Register ↗',
  },
  {
    day: '04',
    month: 'SEP',
    title: 'Codeforces Contest Watch',
    meta: '7:30 PM · Online',
    desc: 'Competitive Programming',
    action: 'View event ↗',
  },
  {
    day: '12',
    month: 'SEP',
    title: 'Systems Thinking: An Intro',
    meta: '4:00 PM · Seminar Hall 2',
    desc: 'Talk · Architecture · Practice',
    action: 'View event ↗',
  },
];
const pastEvents = [
  {
    title: 'Split Solve',
    type: 'Informal Event',
    detail: '21 MAR · ROOM 217',
    image: '/events/split-solve.jpg',
    theme: 'split',
  },
  {
    title: 'C++ Workshop',
    type: 'Workshop',
    detail: '16–18 JAN 2026 · ROOMS 214, 219, 220',
    image: '/events/cpp-workshop.jpg',
    theme: 'cpp',
  },
  {
    title: 'SWE Quest',
    type: 'Interview Preparation',
    detail: 'PHASE I / COMPETE · PHASE II / MOCK INTERVIEWS',
    image: '/events/swe-quest.jpg',
    theme: 'swe',
  },
  {
    title: 'Rewind Recode',
    type: 'Coding Challenge',
    detail: 'PRIZE POOL 50K+ · CERTIFICATES FOR ALL',
    image: '/events/rewind-recode.jpg',
    theme: 'rewind',
  },
  {
    title: 'Blind Coding',
    type: 'Formal Event',
    detail: '06 SEP · R&D LAB 6 · 9 AM',
    image: '/events/blind-coding.jpg',
    theme: 'blind',
  },
];
const resources = [
  {
    no: '01',
    title: 'Data Structures & Algorithms',
    desc: 'Patterns, problems and the fundamentals that compound.',
    count: '12 topics · 184 problems',
  },
  {
    no: '02',
    title: 'Development',
    desc: 'Practical guides for shipping products people use.',
    count: '8 guides · 34 resources',
  },
  {
    no: '03',
    title: 'Interview Preparation',
    desc: 'Experiences and focused preparation from our alumni.',
    count: '27 experiences · 16 guides',
  },
  {
    no: '04',
    title: 'System Design',
    desc: 'Notes and case studies for thinking at scale.',
    count: '14 notes · 9 case studies',
  },
];

function Arrow() {
  return <span className="arrow">↗</span>;
}
function Logo() {
  return (
    <a className="logo" href="/" aria-label="IET Bit Mesra home">
      <span className="logo-badge">
        <img src="/iet-bit-mesra.svg" alt="IET Bit Mesra" />
      </span>
    </a>
  );
}
function Counter({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState('0');
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const target = parseInt(value, 10);
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 850, 1);
          setShown(String(Math.round(target * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <strong ref={ref}>
      {shown}
      {value.includes('+') ? ' +'.trim() : ''}
    </strong>
  );
}
const statData = [
  ['01', 'Members', '120+'],
  ['02', 'Events hosted', '35+'],
  ['03', 'Avg. CF rating', '1420'],
  ['04', 'Projects built', '28+'],
];
function StatsStrip() {
  return (
    <section className="stats container scroll-reveal" aria-label="IET statistics">
      {statData.map(([n, l, v]) => (
        <div className="stat" key={l}>
          <span className="stat-no">{n}</span>
          <div>
            <Counter value={v} />
            <small>{l}</small>
          </div>
        </div>
      ))}
    </section>
  );
}
function EventList({ items }) {
  return (
    <div className="event-list">
      {items.map((e) => (
        <article className="event interactive-card reveal-on-scroll" key={e.title}>
          <div className="date">
            <b>{e.day}</b>
            <span>{e.month}</span>
          </div>
          <div className="event-main">
            <h3>{e.title}</h3>
            <p>{e.meta}</p>
          </div>
          <div className="event-desc">{e.desc}</div>
          <a href="/join" className="event-action">
            {e.action}
          </a>
        </article>
      ))}
    </div>
  );
}
function PastEvents() {
  return (
    <section className="past-events">
      <div className="past-events-head">
        <div>
          <span className="kicker">ARCHIVE / PAST EVENTS</span>
          <h3>
            What we’ve
            <br />
            <em>already built.</em>
          </h3>
        </div>
        <span className="archive-count">05 / ARCHIVED</span>
      </div>
      <div className="poster-grid">
        {pastEvents.map((event, index) => (
          <article
            className={`poster-card poster-${event.theme} reveal-on-scroll`}
            style={{ '--poster-delay': `${index * 90}ms` }}
            key={event.title}
          >
            <div className="poster-art">
              <img
                src={event.image}
                alt={`${event.title} event poster`}
                loading="lazy"
                onError={(e) => e.currentTarget.classList.add('missing')}
              />
              <div className="poster-fallback">
                <span>IET / BIT MESRA</span>
                <strong>{event.title}</strong>
                <small>{event.type}</small>
              </div>
              <span className="poster-index">0{index + 1}</span>
            </div>
            <div className="poster-info">
              <div>
                <h4>{event.title}</h4>
                <p>{event.type}</p>
              </div>
              <span>{event.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function ResourceGrid({ items }) {
  return (
    <div className="resource-grid">
      {items.map((r) => (
        <a href="/resources" className="resource interactive-card reveal-on-scroll" key={r.no}>
          <span className="resource-no">{r.no}</span>
          <div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <small>{r.count}</small>
          </div>
          <Arrow />
        </a>
      ))}
    </div>
  );
}
const toolchain = [
  ['codeforces', 'Codeforces', 'CONTESTS', 'competitive', 'https://codeforces.com'],
  ['leetcode', 'LeetCode', 'DSA / PRACTICE', 'competitive', 'https://leetcode.com'],
  ['codechef', 'CodeChef', 'COMPETITIVE', 'competitive', 'https://www.codechef.com'],
  ['github', 'GitHub', 'OPEN SOURCE', 'development', 'https://github.com'],
  ['react', 'React', 'FRONTEND', 'development', 'https://react.dev'],
  ['docker', 'Docker', 'CONTAINERS', 'devops', 'https://www.docker.com'],
  ['nodedotjs', 'Node.js', 'BACKEND', 'development', 'https://nodejs.org'],
  ['djangoproject', 'Django', 'BACKEND', 'development', 'https://www.djangoproject.com'],
  ['githubactions', 'GitHub Actions', 'CI / CD', 'devops', 'https://github.com/features/actions'],
];
const orbit = { p: 220, e: 0, G: 1, M: 1 };
const orbitRadius = orbit.p / (1 - orbit.e ** 2);
const orbitalVelocity = Math.sqrt((orbit.G * orbit.M) / orbitRadius);
function Toolchain() {
  const magnet = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--tx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
    e.currentTarget.style.setProperty('--ty', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty('--tx', '0px');
    e.currentTarget.style.setProperty('--ty', '0px');
  };
  return (
    <section className="toolchain container scroll-reveal">
      <div className="toolchain-head">
        <span className="kicker">05 / DEVELOPER ECOSYSTEM</span>
        <p>
          Where ideas become
          <br />
          <em>systems.</em>
        </p>
        <small>
          ACTIVE ECOSYSTEM / {String(toolchain.length).padStart(2, '0')}
          <br />
          CIRCULAR ORBIT / p {orbit.p} / r {orbitRadius} / v {orbitalVelocity.toFixed(3)}
        </small>
      </div>
      <div className="ecosystem-canvas" style={{ '--orbit-radius': `${orbitRadius}px` }}>
        <div className="ecosystem-center">
          <span>IET</span>
          <small>BUILD / CONNECT</small>
        </div>
        <div className="orbit-ring" aria-hidden="true"></div>
        <div className="toolchain-grid orbit-layout">
          {toolchain.map(([slug, name, meta, category, url], i) => (
            <a
              className={`tool-logo interactive-card category-${category}`}
              href={url}
              target="_blank"
              rel="noreferrer"
              onPointerMove={magnet}
              onPointerLeave={reset}
              style={{
                '--delay': `${i * 65}ms`,
                '--orbit-angle': `${(i * 360) / toolchain.length}deg`,
              }}
              key={name}
            >
              <div className="logo-frame">
                <img
                  src={`https://cdn.simpleicons.org/${slug}/d6ff3f`}
                  alt={`${name} logo`}
                  loading="lazy"
                />
              </div>
              <span className="tool-name">{name}</span>
              <span className="tool-meta">{meta}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
const pageContent = {
  '/about': [
    'ABOUT IET',
    'We build people who build things.',
    'IET is a student-led engineering community where students learn through building, competing and collaborating. Explore our story, mission and values.',
  ],
  '/events': [
    'EVENTS',
    'Show up. Learn. Ship.',
    'Workshops, contest watches, talks and build sessions designed for consistent technical progress.',
  ],
  '/resources': [
    'RESOURCE VAULT',
    'A library that compounds.',
    'Curated DSA sheets, development guides, interview experiences and system design notes — maintained by the community.',
  ],
  '/projects': [
    'PROJECTS',
    'Work worth sharing.',
    'A curated showcase of products and experiments built by IET members. Project submissions are reviewed by the core team.',
  ],
  '/community': [
    'COMMUNITY',
    'Find your people.',
    'Meet the builders, competitive programmers, alumni and mentors who make IET a place to keep growing.',
  ],
  '/join': [
    'JOIN IET',
    'Ready to build with us?',
    'Whether you are into CP, development, systems, AI or simply want to build, there is a place for you here.',
  ],
  '/contact': [
    'CONTACT',
    'Start a conversation.',
    'Reach the IET Developer Team for collaborations, events, partnerships and general questions.',
  ],
  '/faq': [
    'FAQ',
    'Good questions welcome.',
    'Find answers about eligibility, recruitment, fees, events and contributing to the community.',
  ],
};
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [path, setPath] = useState(window.location.pathname);
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
    const items = document.querySelectorAll('.reveal-on-scroll,.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [path]);
  const faqs = [
    'Who can join IET?',
    'Do I need prior coding experience?',
    'How does recruitment work?',
    'Are there membership fees?',
  ];
  if (path !== '/') return <StandalonePage path={path} />;
  const spotlight = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty(
      '--identity-x',
      `${Math.max(-8, Math.min(8, ((e.clientX - r.left - r.width / 2) / r.width) * 16))}px`,
    );
    e.currentTarget.style.setProperty(
      '--identity-y',
      `${Math.max(-8, Math.min(8, ((e.clientY - r.top - r.height / 2) / r.height) * 16))}px`,
    );
  };
  return (
    <div id="top">
      <div className="scroll-progress" aria-hidden="true"></div>
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
      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse"></span>IET CLUB / DEVELOPER COMMUNITY{' '}
              <span className="year">2026</span>
            </div>
            <h1 className="reveal-title">
              Engineering minds.
              <br />
              <em>Building</em> what’s next.
            </h1>
            <p className="hero-text">
              A student-led engineering community for people who learn by building, competing and
              collaborating.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#join">
                Join the community <Arrow />
              </a>
              <a className="text-link" href="#events">
                Explore what we do <Arrow />
              </a>
            </div>
          </div>
          <div
            className="hero-art"
            onMouseMove={spotlight}
            aria-label="IET identity and developer network"
          >
            <div className="crosshair c1"></div>
            <div className="crosshair c2"></div>
            <div className="grid-label">
              RANCHI / INDIA
              <br />
              <span>23.3441° N&nbsp;&nbsp;85.3096° E</span>
            </div>
            <div className="hero-identity">
              <span className="identity-overline">EST. 2019 / BIT MESRA</span>
              <strong>IET</strong>
              <span className="identity-caption">
                ENGINEERING
                <br />
                INNOVATION
                <br />
                TOGETHER
              </span>
              <i></i>
            </div>
            <div className="diagram">
              <div className="node n1"></div>
              <div className="node n2"></div>
              <div className="node n3"></div>
              <div className="node n4"></div>
              <svg viewBox="0 0 400 340">
                <path d="M55 250 L140 150 L220 190 L320 65 M140 150 L305 285 M220 190 L320 65" />
              </svg>
            </div>
            <div className="art-caption">
              01 / IDENTITY
              <br />
              <span>Curiosity into craft</span>
            </div>
          </div>
        </section>
        <StatsStrip />
        <Toolchain />
        <div className="ticker" aria-label="IET values">
          <div>
            BUILD <i>✦</i> COMPETE <i>✦</i> LEARN <i>✦</i> COLLABORATE <i>✦</i> SHIP <i>✦</i>&nbsp;
          </div>
          <div aria-hidden="true">
            BUILD <i>✦</i> COMPETE <i>✦</i> LEARN <i>✦</i> COLLABORATE <i>✦</i> SHIP <i>✦</i>&nbsp;
          </div>
        </div>
        <section className="section container" id="events">
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
        <section className="section activity">
          <div className="container activity-inner">
            <div>
              <span className="kicker">03 / CODING · LIVE</span>
              <h2>
                A little friendly
                <br />
                <em>pressure.</em>
              </h2>
              <p className="muted">The people putting in the reps. Snapshot synced 2h ago.</p>
              <a className="text-link" href="#community">
                See leaderboard <Arrow />
              </a>
            </div>
            <div className="leaderboard">
              <div className="leader-head">
                <span>RANK · MEMBER</span>
                <span>CODEFORCES</span>
              </div>
              {[
                ['01', 'Ananya Rao', '1842'],
                ['02', 'Ritvik Sinha', '1761'],
                ['03', 'Mihir Jain', '1698'],
                ['04', 'Sana Khan', '1612'],
              ].map((r) => (
                <div className="leader-row" key={r[0]}>
                  <span>
                    <b>{r[0]}</b>
                    {r[1]}
                  </span>
                  <strong>
                    {r[2]} <small>CF</small>
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="resources">
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
        <section className="section about container" id="about">
          <div className="about-mark">
            IET
            <br />
            <span>
              EST.
              <br />
              2019
            </span>
          </div>
          <div className="about-copy">
            <span className="kicker">05 / WHY IET</span>
            <h2>
              We build people
              <br />
              who <em>build things.</em>
            </h2>
            <p>
              IET is a student-led engineering community that turns curiosity into consistent
              practice. Through code, conversations and collaboration, we make space for technical
              excellence to grow.
            </p>
            <a className="button outline" href="#about">
              Our story <Arrow />
            </a>
          </div>
        </section>
        <section className="join" id="join">
          <div className="container join-inner">
            <span className="kicker">06 / YOUR NEXT MOVE</span>
            <h2>
              Ready to build
              <br />
              <em>with us?</em>
            </h2>
            <p>
              Whether you're into CP, development, systems, AI or simply want to build, there's a
              place for you here.
            </p>
            <a className="button primary" href="mailto:hello@ietclub.in">
              Apply to IET <Arrow />
            </a>
          </div>
        </section>
        <section className="section container faq" id="community">
          <div>
            <span className="kicker">07 / FAQ</span>
            <h2>
              Good questions
              <br />
              <em>welcome.</em>
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((q, i) => (
              <div className={'faq-item ' + (openFaq === i ? 'active' : '')} key={q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>0{i + 1}</span>
                  {q}
                  <b>{openFaq === i ? '−' : '+'}</b>
                </button>
                {openFaq === i && (
                  <p>
                    We welcome students from every year and background. Follow our events and
                    recruitment announcements to find your way in.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
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
    </div>
  );
}
createRoot(document.getElementById('root')).render(<App />);
