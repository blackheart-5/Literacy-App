import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/learn');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
      background: 'radial-gradient(ellipse at top left, rgba(168,85,247,0.15) 0%, #0f172a 50%, rgba(34,211,238,0.08) 100%)',
      padding: '1.5rem',
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>

        {/* Logo / Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
            marginBottom: '1rem',
            fontSize: '1.6rem',
          }}>
            📖
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>
            Welcome back
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Sign in to continue learning
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/Register" style={{ color: '#22d3ee', fontWeight: '500' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
