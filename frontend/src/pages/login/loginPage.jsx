import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Arrow from '../../components/Arrow';
import { apiRequest } from '../../lib/api';
import './login.css';

export default function LoginPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function checkSession() {
            try {
                const data = await apiRequest('/api/auth/me');
                if (isMounted && data.success && data.admin) {
                    setAdmin(data.admin);
                    window.dispatchEvent(new CustomEvent('iet-auth-change', { detail: data.admin }));
                }
            } catch {
                // Not authenticated or network issue; proceed with login form
            } finally {
                if (isMounted) setCheckingAuth(false);
            }
        }
        checkSession();

        const handleAuthChange = (e) => {
            if (e?.detail !== undefined) {
                setAdmin(e.detail);
                if (e.detail === null) {
                    setError('');
                    setSuccess('Logout successful.');
                    setEmail('');
                    setPassword('');
                } else {
                    setError('');
                    setSuccess('');
                }
            } else {
                checkSession();
            }
        };

        window.addEventListener('iet-auth-change', handleAuthChange);
        return () => {
            isMounted = false;
            window.removeEventListener('iet-auth-change', handleAuthChange);
        };
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) {
            setError('College email is required.');
            return;
        }

        const isAllowedBatch = trimmedEmail.endsWith('.24@bitmesra.ac.in') || trimmedEmail.endsWith('.25@bitmesra.ac.in');
        if (!isAllowedBatch) {
            setError('Invalid Email or Password');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        setLoading(true);
        try {
            const data = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: trimmedEmail,
                    password,
                }),
            });

            if (!data.success) {
                setError(data.message || 'Invalid email or password.');
                return;
            }

            setAdmin(data.admin);
            window.dispatchEvent(new CustomEvent('iet-auth-change', { detail: data.admin }));
            setSuccess('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(
                err.name === 'TypeError'
                    ? 'Cannot connect to authentication server. Please ensure the backend is running.'
                    : (err.message || 'Invalid email or password.')
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPath="/login" />

            <main className="login-page-main">
                <div className="login-bg-glow" aria-hidden="true" />
                {!admin && <div className="login-bg-grid" aria-hidden="true" />}

                {checkingAuth ? (
                    <div className="admin-verifying-session">
                        <div className="btn-spinner" style={{ margin: '0 auto 1rem', width: 28, height: 28, borderTopColor: '#a78bfa' }} />
                        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', fontFamily: 'DM Mono, monospace' }}>
                            Verifying admin session...
                        </p>
                    </div>
                ) : admin ? (
                    <div className="admin-welcome-hero">
                        <h1 className="admin-welcome-heading">
                            Welcome <em>{admin.name || 'Admin'}</em> to the IET Portal
                        </h1>
                    </div>
                ) : (
                    <div className="login-container">
                        <div className="login-header">
                            <h1>
                                Access <em>Nexus.</em>
                            </h1>
                            <p>
                                Welcome to IET Club — connect, innovate, and build something extraordinary.
                            </p>
                        </div>

                        <div className="login-card">
                            <form className="login-form" onSubmit={handleLogin} noValidate>
                                {error && (
                                    <div className="login-alert error" role="alert">
                                        <span className="alert-icon">⚠</span>
                                        <span>{error}</span>
                                    </div>
                                )}

                                {success && (
                                    <div className="login-alert success" role="status">
                                        {/* <span className="alert-icon">✓</span> */}
                                        <span>{success}</span>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin-email">
                                        <span>College Email</span>
                                        {/* <span className="form-label-badge">.24 batch</span> */}
                                    </label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </span>
                                        <input
                                            id="admin-email"
                                            type="email"
                                            className="login-input"
                                            placeholder="btechxxxxxx.2x@bitmesra.ac.in"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="username"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {/* <span className="form-hint">Only registered .24@bitmesra.ac.in admin accounts</span> */}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="admin-password">
                                        <span>Password</span>
                                        {/* <span className="form-label-badge">Min 12 chars</span> */}
                                    </label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            id="admin-password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="login-input"
                                            placeholder="••••••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="btn-spinner" />
                                            <span>Authenticating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Login</span>
                                            <Arrow />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}
