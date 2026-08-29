import Arrow from './Arrow';

function Leaderboard() {
  return (
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
  );
}

export default Leaderboard;
