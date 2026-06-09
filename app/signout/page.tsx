'use client'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function SignOutPage() {
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(135deg, #0A2540 0%, #0d3060 50%, #0A2540 100%)',
    }}>
      {/* Top bar */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <img src="/urus-logo.png" alt="Urus AI" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Verdana, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF', letterSpacing: '.04em' }}>Law</span>
        </div>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,.2)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#7DD3D1', letterSpacing: '.12em', textTransform: 'uppercase' }}>
          Powered by Urus AI Sdn Bhd
        </span>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{
            background: '#FFFFFF', borderRadius: 12,
            boxShadow: '0 24px 64px rgba(0,0,0,.25)',
            overflow: 'hidden',
          }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #0F7B7A, #3FA8A6)' }} />

            <div style={{ padding: '36px 40px 40px', textAlign: 'center' }}>
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#E0F5F5', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                🔐
              </div>

              <h1 style={{ fontFamily: 'Verdana, sans-serif', fontSize: 20, fontWeight: 700, color: '#0A2540', marginBottom: 8 }}>
                Sign Out
              </h1>
              <p style={{ fontSize: 13, color: '#555F6E', marginBottom: 28, lineHeight: 1.6 }}>
                Are you sure you want to sign out of Urus Law?
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={process.env.NEXT_PUBLIC_APP_URL || 'https://legal-ai-amin-s-projectsurus.vercel.app'}
                  style={{
                    flex: 1, padding: '12px 16px', textAlign: 'center',
                    border: '1.5px solid #E5E9EE', borderRadius: 8,
                    fontFamily: 'Verdana, sans-serif', fontSize: 12, fontWeight: 600,
                    color: '#555F6E', textDecoration: 'none',
                    transition: 'all .14s', display: 'block',
                  }}
                >
                  Cancel
                </a>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  style={{
                    flex: 1, padding: '12px 16px',
                    background: loading ? '#9AA8B8' : '#0F7B7A',
                    border: 'none', borderRadius: 8,
                    fontFamily: 'Verdana, sans-serif', fontSize: 12, fontWeight: 700,
                    color: '#FFFFFF', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background .15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
                      Signing out…
                    </>
                  ) : 'Sign Out'}
                </button>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: 'monospace', letterSpacing: '.06em' }}>
            URUS LAW  ·  POWERED BY URUS AI SDN BHD
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
