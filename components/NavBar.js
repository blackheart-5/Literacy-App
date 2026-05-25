import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/learn', label: 'Learn' },
  { href: '/Profile', label: 'Profile' },
  { href: '/Progress', label: 'Progress' },
  { href: '/settings', label: 'Settings' },
];

export default function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <Link href="/learn" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '700',
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
        }}>
          📖 LinguaFlash
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="nav-desktop">
          {navLinks.map(({ href, label }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: active ? '600' : '400',
                color: active ? '#22d3ee' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(34,211,238,0.1)' : 'transparent',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}>
                {label}
              </Link>
            );
          })}
          <Link href="/logging_out" style={{
            marginLeft: '0.75rem',
            padding: '0.45rem 0.9rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.15s ease',
            textDecoration: 'none',
          }}>
            Log out
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0.5rem',
            padding: '0.45rem 0.6rem',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            lineHeight: 1,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          background: 'rgba(15,23,42,0.97)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0.75rem 1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          position: 'sticky',
          top: '57px',
          zIndex: 99,
        }}>
          {navLinks.map(({ href, label }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: '0.65rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: active ? '600' : '400',
                color: active ? '#22d3ee' : 'rgba(255,255,255,0.7)',
                background: active ? 'rgba(34,211,238,0.08)' : 'transparent',
                textDecoration: 'none',
              }}>
                {label}
              </Link>
            );
          })}
          <Link href="/logging_out" style={{
            marginTop: '0.5rem',
            padding: '0.65rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.4)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '0.85rem',
            textDecoration: 'none',
          }}>
            Log out
          </Link>
        </div>
      )}

      <style>{`
        .nav-hamburger { display: none; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
