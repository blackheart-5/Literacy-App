import NavBar from '../components/NavBar';

export default function SettingsPage() {
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
          Settings
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {[
            { label: 'Daily Goal', description: 'Set a daily word learning target', icon: '🎯', coming: true },
            { label: 'Notifications', description: 'Reminder alerts to keep your streak', icon: '🔔', coming: true },
            { label: 'Theme', description: 'Switch between dark and light mode', icon: '🎨', coming: true },
            { label: 'Language', description: 'Choose your target language', icon: '🌍', coming: true },
          ].map(({ label, description, icon, coming }) => (
            <div key={label} className="glass-card" style={{
              padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                <div>
                  <p style={{ color: '#f1f5f9', fontWeight: '500', margin: '0 0 0.2rem', fontSize: '0.95rem' }}>
                    {label}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', margin: 0 }}>
                    {description}
                  </p>
                </div>
              </div>
              {coming && (
                <span style={{
                  padding: '0.25rem 0.6rem',
                  background: 'rgba(168,85,247,0.15)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  borderRadius: '999px',
                  fontSize: '0.7rem', fontWeight: '500',
                  color: '#a855f7',
                }}>
                  Coming soon
                </span>
              )}
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}
