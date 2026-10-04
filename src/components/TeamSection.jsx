export const socialLinks = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    path: 'M5.2 3.1a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0ZM1.2 7h4v12h-4V7Zm6.5 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.8-1.9 4.1 0 4.9 2.7 4.9 6.2V19h-4v-5.4c0-1.3 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V19h-4.5V7Z',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    path: 'M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7Zm5 3.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5Zm0 2A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Zm5.8-3.1a1.3 1.3 0 1 1-1.3 1.3 1.3 1.3 0 0 1 1.3-1.3Z',
  },
  {
    key: 'gitlab',
    label: 'GitLab',
    path: 'M22.2 13.3 20.8 9l-1.4-4.3c-.1-.4-.7-.4-.9 0l-1.4 4.3H7L5.6 4.7c-.1-.4-.7-.4-.9 0L3.3 9l-1.4 4.3c-.1.3 0 .6.2.8L12 21l9.9-7.2c.3-.1.4-.3.3-.5ZM12 19.2 3.7 13l3.5-2.6L12 19.2Zm0 0 4.8-8.8 3.5 2.6-8.3 6.2Z',
  },
];

export function SocialIcon({ type, name, href }) {
  const link = socialLinks.find((social) => social.key === type);
  if (!link || !href) return null;

  return (
    <a
      className="team-social-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} profile of ${name}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={link.path} />
      </svg>
    </a>
  );
}

export function MemberCard({ member, featured = false, showRef = false, onSelect }) {
  const [firstName, ...lastName] = member.name.trim().split(/\s+/);
  const initials = `${firstName?.[0] || ''}${lastName.at(-1)?.[0] || ''}`.toUpperCase();

  return (
    <article
      className={`team-card${featured ? ' team-card-featured' : ''}`}
      style={{ '--team-accent': member.accent || '#2d6cdf' }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? () => onSelect(member) : undefined}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(member);
              }
            }
          : undefined
      }
    >
      {showRef ? <span className="team-ref-tag">{member.role}</span> : null}
      <div className="team-photo">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={`${member.name}, ${member.role}`}
            onError={(event) => {
              event.currentTarget.hidden = true;
              event.currentTarget.nextElementSibling.hidden = false;
            }}
          />
        ) : null}
        <span className="team-photo-fallback" hidden={Boolean(member.photoUrl)} aria-hidden="true">
          {initials || '?'}
        </span>
      </div>
      <div className="team-card-content">
        <h3>{member.name}</h3>
        <p className="team-role">{member.role}</p>
        {member.year ? <p className="team-year">{member.year}</p> : null}
        {member.bio ? <p className="team-bio">{member.bio}</p> : null}
        {onSelect ? (
          <span className="team-card-action" aria-hidden="true">View profile <span>↗</span></span>
        ) : (
          <div className="team-socials">
            {socialLinks.map(({ key }) => (
              <span key={key} onClick={(event) => event.stopPropagation()}>
                <SocialIcon type={key} name={member.name} href={member.links?.[key]} />
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function TeamGrid({ members, category, featured = [] }) {
  const categoryMembers = members
    .filter((member) => member.category === category)
    .sort((first, second) => first.displayOrder - second.displayOrder);
  const featuredMembers = categoryMembers.filter((member) => featured.includes(member.role));
  const standardMembers = categoryMembers.filter((member) => !featured.includes(member.role));

  if (!categoryMembers.length) return null;

  return (
    <div className="team-group">
      <h3 className="team-group-title">
        {category === 'core' ? 'Core Team' : category === 'faculty' ? 'Faculty Advisors' : 'Alumni'}
      </h3>
      {featuredMembers.length ? (
        <div className="team-featured-grid">
          {featuredMembers.map((member) => (
            <MemberCard key={member.id} member={member} featured />
          ))}
        </div>
      ) : null}
      {standardMembers.length ? (
        <div className="team-grid">
          {standardMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TeamSection({ members = [], k23Members = [], featured = [], preview = false }) {
  const visibleMembers = members;

  return (
    <section className="section team-section" id="team">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">05 / THE PEOPLE</span>
            <h2 className="reveal-title">
              Meet the <em>team.</em>
            </h2>
          </div>
          <p className="team-intro">
            The people shaping IET into a place to learn, build and belong.
          </p>
          {preview ? (
            <a className="text-link" href="/team">
              View full team <span className="arrow">↗</span>
            </a>
          ) : null}
        </div>
        {visibleMembers.length ? (
          preview ? (
            <>
              {[
                { label: 'K23', cohort: k23Members },
                { label: 'K24', cohort: visibleMembers },
              ].map(({ label, cohort }) => (
                <div className="team-cohort" key={label}>
                  <h3 className="team-cohort-title">{label} <span>Executive Body</span></h3>
                  <div className="executive-team-grid">
                    {cohort.map((member) => <MemberCard key={member.id} member={member} />)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <TeamGrid members={visibleMembers} category="core" featured={featured} />
              <TeamGrid members={visibleMembers} category="faculty" />
              <TeamGrid members={visibleMembers} category="alumni" />
            </>
          )
        ) : (
          <div className="team-empty">
            <span className="team-empty-mark">IET / 2026</span>
            <p>Executive body details are being assembled.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamSection;