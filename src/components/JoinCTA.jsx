import Arrow from './Arrow';

function JoinCTA() {
  return (
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
  );
}

export default JoinCTA;
