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
  );
}

export default About;
