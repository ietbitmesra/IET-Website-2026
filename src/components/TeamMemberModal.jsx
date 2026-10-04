import { useEffect } from 'react';
import { socialLinks } from './TeamSection';

function initials(name) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] || ''}${parts.at(-1)?.[0] || ''}`.toUpperCase();
}

function TeamMemberModal({ member, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('team-modal-open');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('team-modal-open');
    };
  }, [onClose]);

  if (!member) return null;

  const availableLinks = socialLinks.filter((social) => member.links?.[social.key]);

  return (
    <div className="team-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="team-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-modal-name"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="team-modal-close" type="button" onClick={onClose} aria-label="Close profile">
          ×
        </button>
        <div className="team-modal-photo">
          {member.photoUrl ? (
            <img src={member.photoUrl} alt={`${member.name}, ${member.role}`} />
          ) : (
            <span aria-hidden="true">{initials(member.name) || '?'}</span>
          )}
        </div>
        <div className="team-modal-body">
          <span className="team-modal-kicker">IET / EXECUTIVE BODY 2026-27</span>
          <h2 id="team-modal-name">{member.name}</h2>
          <p className="team-modal-role">{member.role}</p>
          {member.year ? <p className="team-modal-year">{member.year}</p> : null}
          <p className="team-modal-bio">
            {member.bio || `Leads ${member.role.toLowerCase()} initiatives across IET.`}
          </p>
          <div className="team-modal-links">
            <span className="team-modal-links-label">PROFILE LINKS</span>
            {availableLinks.length ? (
              <div className="team-modal-socials">
                {availableLinks.map((social) => (
                  <a
                    key={social.key}
                    className="team-modal-social"
                    href={member.links[social.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} profile of ${member.name}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="team-modal-empty">Profile links will be added when submitted.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamMemberModal;
