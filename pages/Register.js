import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function getPasswordStrength(password) {
  if (!password) return null;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const long = password.length >= 12;
  const decent = password.length >= 8;

  if (!decent) return { label: 'Too short', color: '#ef4444', width: '20%' };
  if (decent && !hasNumber && !hasSpecial) return { label: 'Weak', color: '#f97316', width: '35%' };
  if ((hasNumber || hasSpecial) && !long) return { label: 'Fair', color: '#eab308', width: '60%' };
  if ((hasNumber || hasSpecial) && long && !hasUpper) return { label: 'Good', color: '#22d3ee', width: '80%' };
  if (hasUpper && hasNumber && hasSpecial && long) return { label: 'Strong', color: '#4ade80', width: '100%' };
  return { label: 'Good', color: '#22d3ee', width: '80%' };
}

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/Login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('User already exists. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at bottom right, rgba(34,211,238,0.12) 0%, #0f172a 50%, rgba(168,85,247,0.1) 100%)',
      padding: '1.5rem',
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '56px', height: '56px', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            marginBottom: '1rem', fontSize: '1.6rem',
          }}>
            🚀
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>
            Create account
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Start your language learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label className="label-dark" htmlFor="username">Username</label>
            <input
              className="input-dark"
              type="text"
              id="username"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label-dark" htmlFor="email">Email</label>
            <input
              className="input-dark"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label-dark" htmlFor="password">Password</label>
            <input
              className="input-dark"
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Strength bar */}
            {strength && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{
                  height: '4px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: strength.width,
                    background: strength.color,
                    borderRadius: '999px',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }} />
                </div>
                <p style={{
                  fontSize: '0.75rem',
                  color: strength.color,
                  marginTop: '0.3rem',
                  fontWeight: '500',
                }}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              color: '#fca5a5',
              fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}

          <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: '0.25rem' }}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
          Already have an account?{' '}
          <Link href="/Login" style={{ color: '#22d3ee', fontWeight: '500' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
