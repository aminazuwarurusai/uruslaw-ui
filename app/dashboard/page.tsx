import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/')

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0A2540 0%, #0d3060 50%, #0A2540 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'Verdana, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF', letterSpacing: '.06em' }}>
          Urus Law
        </span>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,.2)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#7DD3D1', letterSpacing: '.12em', textTransform: 'uppercase' }}>
          Powered by Urus AI Sdn Bhd
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', fontFamily: 'monospace' }}>
          {session.user?.email}
        </span>
        <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
          <button style={{
            padding: '7px 16px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            borderRadius: 6, color: '#fff', fontFamily: 'monospace', fontSize: 10,
            letterSpacing: '.08em', cursor: 'pointer',
          }}>
            Sign Out
          </button>
        </form>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 560, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Verdana, sans-serif', fontSize: 13, color: '#7DD3D1', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            Welcome back
          </div>
          <h1 style={{ fontFamily: 'Verdana, sans-serif', fontSize: 32, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
            {session.user?.name}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 40, fontFamily: 'Inter, sans-serif' }}>
            You are signed in. Launch the Urus Law application to get started.
          </p>

          <a href="http://localhost:3000" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px', background: '#0F7B7A', color: '#FFFFFF',
            borderRadius: 8, textDecoration: 'none',
            fontFamily: 'Verdana, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '.04em',
          }}>
            Launch Urus Law →
          </a>
        </div>
      </div>

      <p style={{ textAlign: 'center', padding: '20px', fontSize: 11, color: 'rgba(255,255,255,.3)', fontFamily: 'monospace', letterSpacing: '.06em' }}>
        URUS LAW  ·  POWERED BY URUS AI SDN BHD
      </p>
    </div>
  )
}
