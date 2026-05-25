import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavBar from '../components/NavBar';

function ProfileSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="skeleton" style={{ width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="skeleton" style={{ height: '22px', width: '140px' }} />
          <div className="skeleton" style={{ height: '16px', width: '200px' }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="skeleton" style={{ height: '90px', borderRadius: '1rem' }} />
        <div className="skeleton" style={{ height: '90px', borderRadius: '1rem' }} />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/profile')
      .then(async (res) => {
        if (res.status === 401) { router.push('/Login'); return null; }
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => { if (data) setProfile(data.user_instance); })
      .catch(() => setError('Failed to load profile. Please try again.'))
      .finally(() => setLoading(false));
  }, [router]);

  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : '??';

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <NavBar />

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        <h1 style={{
          fontSize: '1.75rem', fontWeight: '700',
          background: 'linear-gradient(135deg, #f1f5f9, rgba(255,255,255,0.6))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 2rem',
        }}>
          Profile
        </h1>

        {loading && <ProfileSkeleton />}

        {error && (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '0.75rem',
            color: '#fca5a5',
          }}>
            {error}
          </div>
        )}

        {profile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Avatar + name */}
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: '700', color: 'white',
                flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.25rem' }}>
                  {profile.username}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', margin: 0 }}>
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: '0 0 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Words Learned
                </p>
                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#22d3ee', margin: 0 }}>
                  {profile.wordsLearned ?? 0}
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: '0 0 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Languages
                </p>
                <p style={{ fontSize: '1rem', fontWeight: '600', color: '#a855f7', margin: 0 }}>
                  {profile.languages?.join(', ') || 'None added'}
                </p>
              </div>
            </div>

            {/* Empty state nudge */}
            {(profile.wordsLearned ?? 0) === 0 && (
              <div className="glass-card" style={{
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(34,211,238,0.15)',
              }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                  You haven&apos;t learned any words yet. Start your first session!
                </p>
                <Link href="/learn" style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.4rem',
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  borderRadius: '0.5rem',
                  color: 'white', fontWeight: '600', fontSize: '0.875rem',
                }}>
                  Start Learning →
                </Link>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
