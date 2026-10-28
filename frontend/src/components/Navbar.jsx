import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { apiRequest } from '../lib/api';

function getInitials(name) {
  if (!name) return 'A';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function Navbar({ menuOpen, setMenuOpen, currentPath = '' }) {
  const [admin, setAdmin] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const data = await apiRequest('/api/auth/me');
        if (isMounted && data.success && data.admin) {
          setAdmin(data.admin);
          return;
        }
        if (isMounted) setAdmin(null);
      } catch {
        if (isMounted) setAdmin(null);
      }
    }

    checkAuth();

    const handleAuthChange = (e) => {
      if (e?.detail !== undefined) {
        setAdmin(e.detail);
      } else {
        checkAuth();
      }
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !e.target.closest('.nav-profile-wrapper')) {
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener('iet-auth-change', handleAuthChange);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      isMounted = false;
      window.removeEventListener('iet-auth-change', handleAuthChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } catch {
      // Clear anyway
    } finally {
      setAdmin(null);
      setProfileDropdownOpen(false);
      window.dispatchEvent(new CustomEvent('iet-auth-change', { detail: null }));
    }
  }

  const handleNavigateToManage = (e) => {
    e.preventDefault();
    setProfileDropdownOpen(false);
    setMenuOpen(false);
    if (window.location.pathname !== '/login') {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo(0, 0);
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className={menuOpen ? 'open' : ''}>
          <a
            className={`mobile-only-home ${currentPath === '/' ? 'active' : ''}`}
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          {[
            ['About', '/about'],
            ['Events', '/events'],
            ['Gallery', '/gallery'],
            ['Team', '/team'],
            ['Join IET', '/join'],
          ].map(([x, h]) => (
            <a
              key={x}
              className={currentPath === h ? 'active' : ''}
              href={h}
              onClick={() => setMenuOpen(false)}
            >
              {x}
            </a>
          ))}
          {admin ? (
            <div className="nav-profile-wrapper" ref={profileRef}>
              <button
                type="button"
                className="nav-cta nav-profile-cta"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setProfileDropdownOpen((prev) => !prev);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                title={`Logged in as ${admin.name} (${admin.email})`}
              >
                <span className="nav-profile-avatar">{getInitials(admin.name)}</span>
                <span className="nav-profile-name">{admin.name.split(' ')[0]}</span>
                {/* <span className="nav-profile-status" aria-hidden="true" /> */}
                <svg
                  className={`nav-profile-chevron ${profileDropdownOpen ? 'open' : ''}`}
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {profileDropdownOpen && (
                <div className="nav-profile-dropdown" role="menu">
                  <div className="nav-profile-dropdown-user">
                    <div className="nav-profile-dropdown-user-row">
                      <p className="nav-profile-dropdown-name">{admin.name}</p>
                      {/* <span className="nav-profile-dropdown-role">Admin</span> */}
                    </div>
                    {/* <p className="nav-profile-dropdown-email">{admin.email}</p> */}
                  </div>

                  <div className="nav-profile-dropdown-divider" />

                  <div className="nav-profile-dropdown-actions">
                    <a
                      href="/login"
                      className="nav-profile-dropdown-manage"
                      onClick={handleNavigateToManage}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span>Manage</span>
                    </a>

                    <button
                      type="button"
                      className="nav-profile-dropdown-logout"
                      onClick={handleLogout}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a className="nav-cta" href="/login" onClick={() => setMenuOpen(false)}>
              Login
              {/* <Arrow /> */}
            </a>
          )}
        </nav>
        <button
          className={`menu ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i></i>
          <i></i>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
