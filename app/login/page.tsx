'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }
    if (!validateEmail(email)) {
      setError('Format email tidak valid.')
      return
    }

    setLoading(true)

    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 15000)
      )

      const authCall = supabase.auth.signInWithPassword({ email, password })
      const { error: authError } = await Promise.race([authCall, timeout]) as Awaited<typeof authCall>

      if (authError) {
        setError('Email atau password salah. Coba lagi.')
        setLoading(false)
        return
      }

      router.push('/')
      router.refresh()
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.message === 'timeout'
      setError(
        isTimeout
          ? 'Koneksi ke server timeout. Cek koneksi internet atau coba lagi.'
          : 'Terjadi kesalahan. Coba lagi.'
      )
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .login-input::placeholder { color: #4b5563; }
        .login-input:focus {
          border-color: rgba(255,140,66,0.6) !important;
          box-shadow: 0 0 0 3px rgba(255,140,66,0.12) !important;
          outline: none;
        }
        .login-btn:hover:not(:disabled) {
          box-shadow: 0 6px 32px rgba(255,140,66,0.55) !important;
          transform: translateY(-1px);
        }
        .login-btn:active:not(:disabled) { transform: scale(0.98); }
        .login-btn { transition: all 0.2s ease; }
        .login-input { transition: border 0.2s, box-shadow 0.2s; }
        body { background: #2a2a3e; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2a2a3e',
        fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        padding: '16px',
      }}>
        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-80px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,66,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-60px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)',
          filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: '420px',
          borderRadius: '24px',
          padding: '40px 36px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '60px', height: '60px',
              borderRadius: '18px',
              background: '#ff8c42',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 8px 32px rgba(255,140,66,0.45)',
            }}>
              <img
                src="/GudangMas Icon.png"
                alt="GudangMas"
                style={{ width: '34px', height: '34px', objectFit: 'contain' }}
              />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '-0.4px' }}>
              GudangMas
            </h1>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '4px' }}>
              Masuk ke akun kamu
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Email */}
              <div>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: '600',
                  color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}>
                  Email
                </label>
                <input
                  id="input-email"
                  className="login-input"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  style={{
                    display: 'block', width: '100%',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    fontSize: '14px', color: '#fff',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    opacity: loading ? 0.6 : 1,
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{
                  display: 'block', fontSize: '11px', fontWeight: '600',
                  color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="input-password"
                    className="login-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    style={{
                      display: 'block', width: '100%',
                      padding: '13px 48px 13px 16px',
                      borderRadius: '12px',
                      fontSize: '14px', color: '#fff',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      opacity: loading ? 0.6 : 1,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none',
                      cursor: 'pointer', color: '#6b7280',
                      display: 'flex', alignItems: 'center', padding: '4px',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171', fontSize: '13px',
                  display: 'flex', gap: '8px', alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '15px' }}>⚠</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                id="btn-masuk"
                type="submit"
                disabled={loading}
                className="login-btn"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  marginTop: '4px',
                  borderRadius: '12px',
                  fontSize: '15px', fontWeight: '600', color: '#fff',
                  background: 'linear-gradient(135deg, #ff8c42 0%, #f97316 100%)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 20px rgba(255,140,66,0.4)',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Memverifikasi...
                  </>
                ) : 'Masuk'}
              </button>
            </div>
          </form>

          <p style={{
            textAlign: 'center', marginTop: '24px',
            fontSize: '12px', color: '#4b5563',
          }}>
            Tidak punya akun? Hubungi administrator.
          </p>
        </div>

        {/* Footer */}
        <p style={{
          position: 'absolute', bottom: '20px',
          fontSize: '12px', color: '#374151',
          textAlign: 'center', width: '100%', zIndex: 1,
        }}>
          © {new Date().getFullYear()} GudangMas · Warehouse Manager
        </p>
      </div>
    </>
  )
}
