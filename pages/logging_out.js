import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoggingOut() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/log_out', { method: 'POST' })
      .finally(() => router.push('/Login'));
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      gap: '1rem',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(34,211,238,0.2)',
        borderTopColor: '#22d3ee',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Signing you out…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
