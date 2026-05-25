import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 60% 20%, rgba(168,85,247,0.18) 0%, #0f172a 45%), radial-gradient(ellipse at 20% 80%, rgba(34,211,238,0.12) 0%, transparent 50%)',
      padding: '2rem',
      textAlign: 'center',
    }}>

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(168,85,247,0.08)', filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'rgba(34,211,238,0.08)', filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.35rem 1rem',
        background: 'rgba(34,211,238,0.1)',
        border: '1px solid rgba(34,211,238,0.25)',
        borderRadius: '999px',
        fontSize: '0.8rem', fontWeight: '500',
        color: '#22d3ee',
        marginBottom: '1.75rem',
        letterSpacing: '0.04em',
      }}>
        ✦ Language Learning, Reimagined
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: '800',
        lineHeight: '1.1',
        maxWidth: '760px',
        margin: '0 0 1.25rem',
        letterSpacing: '-0.02em',
      }}>
        <span style={{
          background: 'linear-gradient(135deg, #f1f5f9 30%, rgba(255,255,255,0.6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Master new words{' '}
        </span>
        <span style={{
          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          faster than ever
        </span>
      </h1>

      <p style={{
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.5)',
        maxWidth: '500px',
        lineHeight: '1.7',
        margin: '0 0 2.5rem',
      }}>
        Adaptive flashcards, progress tracking, and spaced repetition — all in one sleek app built for serious learners.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/Register" style={{
          padding: '0.85rem 2rem',
          borderRadius: '0.625rem',
          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
          color: 'white',
          fontWeight: '600',
          fontSize: '0.95rem',
          boxShadow: '0 0 24px rgba(34,211,238,0.25)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}>
          Get started free →
        </Link>
        <Link href="/Login" style={{
          padding: '0.85rem 2rem',
          borderRadius: '0.625rem',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '500',
          fontSize: '0.95rem',
          transition: 'background 0.15s ease',
        }}>
          Sign in
        </Link>
      </div>

      {/* Feature chips */}
      <div style={{
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
        justifyContent: 'center', marginTop: '3.5rem',
      }}>
        {['🃏 Flashcards', '📊 Progress tracking', '🎯 Difficulty levels', '🔄 Spaced repetition'].map((f) => (
          <span key={f} style={{
            padding: '0.4rem 0.9rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.5)',
          }}>
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
