import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Auth.css'

export default function Auth({ onSuccess, onBack, initialMode = 'signin' }) {
  const [mode, setMode] = useState(initialMode) // 'signin' | 'signup'
  return mode === 'signin'
    ? <SignIn onSwitch={() => setMode('signup')} onSuccess={onSuccess} onBack={onBack} />
    : <SignUp onSwitch={() => setMode('signin')} onSuccess={onSuccess} onBack={onBack} />
}

/* ── SIGN IN ─────────────────────────────────────── */
function SignIn({ onSwitch, onSuccess, onBack }) {
  const { login } = useAuth()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [err,  setErr]    = useState('')
  const [busy, setBusy]   = useState(false)
  const [show, setShow]   = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setErr(''); setBusy(true)
    await new Promise(r => setTimeout(r, 600)) // simulate network
    const res = login(form.email, form.password)
    setBusy(false)
    if (res.ok) onSuccess(res.role)
    else setErr(res.error)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-overlay" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <svg viewBox="0 0 40 24" fill="none" width="36" height="22">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <span className="auth-brand">BEAVERTOWN</span>
          <span className="auth-sub">THE KING'S PLACE</span>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-hint">Sign in to your account</p>

        {err && <div className="auth-error">{err}</div>}

        <form onSubmit={submit} className="auth-form">
          <div className="af-field">
            <label className="af-label">Email Address</label>
            <div className="af-input-wrap">
              <MailIcon />
              <input name="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={handle} required autoComplete="email" />
            </div>
          </div>

          <div className="af-field">
            <label className="af-label">Password</label>
            <div className="af-input-wrap">
              <LockIcon />
              <input name="password" type={show ? 'text' : 'password'} placeholder="••••••••"
                value={form.password} onChange={handle} required autoComplete="current-password" />
              <button type="button" className="af-eye" onClick={() => setShow(p => !p)} aria-label="Toggle password">
                {show ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="af-meta">
            <label className="af-remember">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="af-forgot">Forgot password?</button>
          </div>

          <button type="submit" className="auth-btn" disabled={busy}>
            {busy ? <Spinner /> : <>SIGN IN <ArrowIcon /></>}
          </button>
        </form>

        <div className="auth-divider"><span>OR</span></div>

        <div className="auth-switch">
          Don't have an account?{' '}
          <button onClick={onSwitch}>Create one →</button>
        </div>

        {/* Admin hint */}
        <div className="auth-admin-hint">
          <span>Admin?</span>
          <button onClick={() => {
            setForm({ email: 'admin@beavertown.in', password: 'admin123' })
          }}>Use admin credentials</button>
        </div>

        <button className="auth-back" onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  )
}

/* ── SIGN UP ─────────────────────────────────────── */
function SignUp({ onSwitch, onSuccess, onBack }) {
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [err,  setErr]  = useState('')
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setErr('')
    if (form.password !== form.confirm) { setErr('Passwords do not match.'); return }
    if (form.password.length < 6)       { setErr('Password must be at least 6 characters.'); return }
    setBusy(true)
    await new Promise(r => setTimeout(r, 600))
    const res = signup(form.name, form.email, form.password)
    setBusy(false)
    if (res.ok) onSuccess(res.role)
    else setErr(res.error)
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 6) s++
    if (p.length >= 10) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const strengthLabel = ['','Weak','Fair','Good','Strong','Very Strong'][strength]
  const strengthColor = ['','#e74c3c','#e67e22','#f1c40f','#2ecc71','#D4A017'][strength]

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-overlay" />

      <div className="auth-card">
        <div className="auth-logo">
          <svg viewBox="0 0 40 24" fill="none" width="36" height="22">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <span className="auth-brand">BEAVERTOWN</span>
          <span className="auth-sub">THE KING'S PLACE</span>
        </div>

        <h2 className="auth-title">Join the Kingdom</h2>
        <p className="auth-hint">Create your Beavertown account</p>

        {err && <div className="auth-error">{err}</div>}

        <form onSubmit={submit} className="auth-form">
          <div className="af-field">
            <label className="af-label">Full Name</label>
            <div className="af-input-wrap">
              <UserIcon />
              <input name="name" type="text" placeholder="Your name"
                value={form.name} onChange={handle} required />
            </div>
          </div>

          <div className="af-field">
            <label className="af-label">Email Address</label>
            <div className="af-input-wrap">
              <MailIcon />
              <input name="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={handle} required autoComplete="email" />
            </div>
          </div>

          <div className="af-field">
            <label className="af-label">Password</label>
            <div className="af-input-wrap">
              <LockIcon />
              <input name="password" type={show ? 'text' : 'password'} placeholder="Min. 6 characters"
                value={form.password} onChange={handle} required />
              <button type="button" className="af-eye" onClick={() => setShow(p => !p)} aria-label="Toggle password">
                {show ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {form.password && (
              <div className="pw-strength">
                <div className="pw-bars">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="pw-bar" style={{ background: i <= strength ? strengthColor : 'rgba(255,255,255,.1)' }} />
                  ))}
                </div>
                <span style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="af-field">
            <label className="af-label">Confirm Password</label>
            <div className="af-input-wrap">
              <LockIcon />
              <input name="confirm" type="password" placeholder="Repeat password"
                value={form.confirm} onChange={handle} required />
              {form.confirm && (
                <span className="af-match">
                  {form.password === form.confirm ? <CheckIcon /> : <XIcon />}
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={busy}>
            {busy ? <Spinner /> : <>CREATE ACCOUNT <ArrowIcon /></>}
          </button>
        </form>

        <div className="auth-divider"><span>OR</span></div>

        <div className="auth-switch">
          Already have an account?{' '}
          <button onClick={onSwitch}>Sign in →</button>
        </div>

        <button className="auth-back" onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  )
}

/* ── Icons ─────────────────────────────────────── */
function MailIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function LockIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
function UserIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function EyeIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function EyeOffIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> }
function ArrowIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
function CheckIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> }
function XIcon()      { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function Spinner()    { return <span className="af-spinner" aria-label="Loading" /> }
