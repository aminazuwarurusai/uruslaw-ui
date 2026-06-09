'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setError('')
    setLoading(true)

    const result = await signIn('credentials', { email, password, redirect: false })

    if (result?.error) {
      setLoading(false)
      setError('Invalid email or password.')
    } else {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      // Pass role so main app knows user's access level
      const role = (result as { user?: { role?: string } })?.user?.role || 'user'
      window.location.href = `${appUrl}?r=${role}`
    }
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

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Card */}
          <div style={{
            background: '#FFFFFF', borderRadius: 12,
            boxShadow: '0 24px 64px rgba(0,0,0,.25)',
            overflow: 'hidden',
          }}>
            {/* Card header strip */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #0F7B7A, #3FA8A6)' }} />

            <div style={{ padding: '36px 40px 40px' }}>
              {/* Heading */}
              <h1 style={{ fontFamily: 'Verdana, sans-serif', fontSize: 22, fontWeight: 700, color: '#0A2540', marginBottom: 6, letterSpacing: '-.01em' }}>
                Sign In
              </h1>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 28 }}>
                Enter your credentials to access your account.
              </p>

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputStyle)}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={labelStyle}>Password</label>
                    <button type="button" style={{ fontSize: 11, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      Forgot password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ ...inputStyle, paddingRight: 48 }}
                      onFocus={e => Object.assign(e.target.style, { ...inputFocusStyle, paddingRight: '48px' })}
                      onBlur={e => Object.assign(e.target.style, { ...inputStyle, paddingRight: '48px' })}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11, fontFamily: 'monospace' }}
                    >
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(220,38,38,.05)', border: '1px solid rgba(220,38,38,.2)', borderRadius: 6, fontSize: 12, color: 'var(--red)' }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '13px 20px',
                    background: loading ? 'var(--border2)' : 'var(--teal)',
                    color: '#FFFFFF', border: 'none', borderRadius: 8,
                    fontFamily: 'Verdana, sans-serif', fontSize: 13, fontWeight: 700,
                    letterSpacing: '.04em', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background .15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                  onMouseEnter={e => { if (!loading) (e.target as HTMLButtonElement).style.background = 'var(--teal-deep)' }}
                  onMouseLeave={e => { if (!loading) (e.target as HTMLButtonElement).style.background = 'var(--teal)' }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
                      Signing in…
                    </>
                  ) : 'Sign In'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'rgba(255,255,255,.4)', fontFamily: 'monospace', letterSpacing: '.06em' }}>
            URUS LAW  ·  POWERED BY URUS AI SDN BHD
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #9AA8B8; }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600,
  color: '#555F6E', letterSpacing: '.08em', textTransform: 'uppercase',
  marginBottom: 6, fontFamily: 'monospace',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1.5px solid #E5E9EE', borderRadius: 8,
  fontSize: 13, color: '#1A1A1A', background: '#FAFBFC',
  outline: 'none', fontFamily: 'inherit', transition: 'border-color .15s',
}

const inputFocusStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: '#0F7B7A',
  background: '#FFFFFF',
  boxShadow: '0 0 0 3px rgba(15,123,122,.1)',
}
