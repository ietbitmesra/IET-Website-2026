import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Arrow from '../../components/Arrow';
import './join.css';

const recruitmentDrives = [
    {
        season: 'January Intake',
        title: 'Winter Recruitment (1st Year)',
        badgeColor: '#58a6ff',
        badgeBg: 'rgba(56, 139, 253, 0.15)',
        glowColor: 'rgba(56, 139, 253, 0.1)',
        description:
            'Our initial recruitment drive of the year, designed specifically for 1st-year students looking to break into engineering domains early.',
        timing: 'Around January',
        mode: 'Online Coding Contest',
        domains: ['CP / DSA', 'Development', 'Design'],
        format: '6 Coding Questions',
    },
    {
        season: 'August Intake',
        title: 'Fall Recruitment (2nd Year)',
        badgeColor: '#3fb950',
        badgeBg: 'rgba(63, 185, 80, 0.15)',
        glowColor: 'rgba(63, 185, 80, 0.1)',
        description:
            'Our second recruitment drive of the year, conducted around August specifically for 2nd-year students joining the community.',
        timing: 'Around August',
        mode: 'Online Coding Contest',
        domains: ['CP / DSA', 'Development', 'Design'],
        format: '6 Coding Questions',
    },
];

export default function JoinIetPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const items = document.querySelectorAll('.reveal-on-scroll');
        if (!('IntersectionObserver' in window)) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
        );
        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {/* Hero — same structure as EventsPage */}
            <section className="page-hero events-hero container">
                <div className="events-hero-content">
                    <span className="kicker">RECRUITMENT PORTAL / IET BIT MESRA</span>
                    <h1>
                        Want to build the future?<br />
                        <em>Join our engineering core.</em>
                    </h1>
                    <p>
                        We conduct structured recruitment drives twice a year: the first for{' '}
                        <strong>1st years around January</strong> and the second for{' '}
                        <strong>2nd years around August</strong>.
                    </p>
                </div>
                <div className="events-hero-logo" aria-hidden="true">
                    <img src="/iet-bit-mesra.svg" alt="" />
                </div>
            </section>

            <main className="events-page container">

                {/* Recruitment Cycles */}
                <section className="event-details-group">
                    <div className="event-details-heading">
                        <div>
                            <span className="kicker">ANNUAL TIMELINE</span>
                            <h2>
                                Recruitment<br />
                                <em>Cycles.</em>
                            </h2>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Biannual Intakes</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
                        {recruitmentDrives.map((drive, index) => (
                            <article
                                key={index}
                                className="interactive-card reveal-on-scroll"
                                style={{
                                    background: 'linear-gradient(160deg, var(--raised) 0%, var(--surface) 100%)',
                                    border: '1px solid var(--line)',
                                    borderRadius: '20px',
                                    padding: '36px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: `0 10px 30px ${drive.glowColor}`,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <span style={{ background: drive.badgeBg, color: drive.badgeColor, fontSize: '0.8rem', fontWeight: 700, padding: '6px 14px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                                            {drive.season}
                                        </span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>{drive.timing}</span>
                                    </div>

                                    <h3 style={{ fontSize: '1.55rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                                        {drive.title}
                                    </h3>

                                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>
                                        {drive.description}
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--muted)' }}>Mode:</span>
                                            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{drive.mode}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--muted)' }}>1st Round Format:</span>
                                            <span style={{ color: drive.badgeColor, fontWeight: 600 }}>{drive.format}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Domains Offered:</span>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {drive.domains.map((d, i) => (
                                                    <span key={i} className="workshop-topic-badge">{d}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Selection Roadmap */}
                <section className="event-details-group workshop-feature-group">
                    <div className="event-details-heading">
                        <div>
                            <span className="kicker">SELECTION ROADMAP</span>
                            <h2>
                                What we ask<br />
                                <em>in recruitment?</em>
                            </h2>
                        </div>
                    </div>

                    <div className="workshop-feature-container">
                        {/* Stage 1 */}
                        <div className="workshop-feature-card reveal-on-scroll">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#58a6ff' }}>01</span>
                                <span style={{ background: 'rgba(56, 139, 253, 0.1)', color: '#58a6ff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px' }}>
                                    STAGE 1: CONTEST
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>
                                Online Coding Contest
                            </h3>
                            <p className="workshop-paragraph">
                                Every recruitment starts with an online contest featuring{' '}
                                <strong>6 coding questions</strong>. This round checks your logical reasoning,
                                problem-solving skills, and basic algorithm knowledge. Shortlisting for interviews
                                relies on this score.
                            </p>
                        </div>

                        {/* Stage 2 */}
                        <div className="workshop-feature-card reveal-on-scroll">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#3fb950' }}>02</span>
                                <span style={{ background: 'rgba(63, 185, 80, 0.1)', color: '#3fb950', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px' }}>
                                    STAGE 2: INTERVIEW
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>
                                Domain-Specific Interview
                            </h3>
                            <p className="workshop-paragraph">
                                Candidates shortlisted from the contest move to an interview. Questions are{' '}
                                <strong>strictly based on your chosen domain</strong>—whether you applied for{' '}
                                <strong style={{ color: '#58a6ff' }}>CP / DSA</strong>,{' '}
                                <strong style={{ color: '#58a6ff' }}>Development</strong>, or{' '}
                                <strong style={{ color: '#58a6ff' }}>Design</strong>.
                            </p>

                            <div className="workshop-topics-strip" style={{ marginTop: '20px' }}>
                                <span className="workshop-topics-label">AVAILABLE TRACKS:</span>
                                <div className="workshop-topics-list">
                                    {['CP / DSA', 'Development', 'UI/UX & Design'].map((track) => (
                                        <span className="workshop-topic-badge" key={track}>{track}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back Button */}
                <div style={{ marginTop: '60px' }}>
                    <a className="button outline" href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        Back to home <Arrow />
                    </a>
                </div>

            </main>

            <Footer />
        </>
    );
}
