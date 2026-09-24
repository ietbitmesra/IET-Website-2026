import { useEffect, useRef, useState } from 'react';

function TimelineSection() {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewCenter = window.innerHeight / 2;
      
      const totalDistance = rect.height;
      const passedDistance = viewCenter - rect.top;
      let currentProgress = (passedDistance / totalDistance) * 100;
      
      setProgress(Math.max(0, Math.min(100, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const milestones = [
    {
      year: "2019",
      title: "Inception & Vision",
      desc: "IET BIT Mesra Student Chapter was established to build a diverse home across engineering and technology.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Abstract earth network
    },
    {
      year: "2021",
      title: "Scaling the Community",
      desc: "We introduced focused C++ workshops and dynamic campus competitions to foster practical problem-solving.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop", // Tech servers
    },
    {
      year: "2024",
      title: "Flagship Innovation",
      desc: "Launched high-pressure programming challenges like Rewind Recode and end-to-end simulations with SWE Quest.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=3540&auto=format&fit=crop",
    },
    {
      year: "2026",
      title: "The Next Chapter",
      desc: "As more builders committed to development and systems, we expanded our toolkit, bridging the gap between foundational data structures and competitive execution.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3544&auto=format&fit=crop",
    }
  ];

  return (
    <section className="timeline-container container section-reveal">
      <div className="timeline-header">
        <span className="kicker">OUR JOURNEY</span>
        <h2>
          Building the <em>foundation</em>
          <br /> for a better tomorrow
        </h2>
      </div>
      <div className="timeline" ref={timelineRef} style={{ '--timeline-progress': `${progress}%` }}>
        {milestones.map((m, i) => (
          <div className={`timeline-item ${i % 2 !== 0 ? 'right' : 'left'}`} key={i}>
            <div className="timeline-content">
              <span className="timeline-year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
            <div className="timeline-image">
              <img src={m.image} alt={m.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TimelineSection;
