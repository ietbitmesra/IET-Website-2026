import '../styles/achievements.css';

function AchievementsSection() {
  const achievements = [
    {
      circle: "500+",
      kicker: "STRONG NETWORK",
      title: "Growing Together",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", // Team collaboration
      quote: "Over 500 active developers and engineers across campus",
      desc: "Peer-to-peer learning culture",
    },
    {
      circle: "50+",
      kicker: "CONSISTENT ACTION",
      title: "Continuous Learning",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", // Hackathon/event
      quote: "Hosted 50+ workshops, hackathons, and CP contests",
      desc: "SWE Quest & Rewind Recode",
    },
    {
      circle: "Top",
      kicker: "AWARDS & REACH",
      title: "Campus Leaders",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", // Achievement/students
      quote: "Recognized as a leading technical chapter at BIT Mesra",
      desc: "Top-tier developers globally",
    }
  ];

  return (
    <section className="achievements-section container">
      <div className="achievements-header">
        <h2>Our <em>Achievements</em></h2>
        <p className="achievements-subtitle">Building a legacy through code and community.</p>
      </div>

      <div className="achievements-grid">
        <div className="achievements-line"></div>
        {achievements.map((item, i) => (
          <div className="achievement-card" key={i}>
            <div className="achievement-circle">
              <span>{item.circle}</span>
            </div>
            <div className="achievement-content">
              <span className="kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <div className="achievement-box">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="achievement-img" 
                />
                <div className="achievement-glass">
                  <p className="achievement-quote">"{item.quote}"</p>
                  <div className="achievement-footer">
                    <div>
                      <p className="achievement-author">{item.title}</p>
                      <p className="achievement-desc">{item.desc}</p>
                    </div>
                    <div className="achievement-logo">
                      <span>IET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AchievementsSection;
