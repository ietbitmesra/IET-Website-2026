import Arrow from './Arrow';

function About() {
  return (
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
        <span className="kicker">05 / ABOUT THE IET</span>
        <h2 className="reveal-title">
          Working together to
          <br />
          <em>engineer a better world.</em>
        </h2>
        <p>
          We are the IET and we inspire, inform and influence the global engineering community to
          engineer a better world. As a diverse home across engineering and technology, we share
          knowledge that helps make better sense of the world in order to solve the challenges that
          matter. It’s why we are uniquely placed to champion engineering.
        </p>
        <a className="button outline" href="/about">
          Our story <Arrow />
        </a>
      </div>
    </section>
  );
}

export default About;
