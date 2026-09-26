import { useState } from 'react'
import './LandingPage.css'

export default function LandingPage({ onEnter }) {
  const [out, setOut] = useState(false)
  const go = () => { setOut(true); setTimeout(onEnter, 600) }

  return (
    <div className={`lp${out ? ' lp-out' : ''}`}>
      <div className="lp-bg" />
      <div className="lp-overlay" />

      {/* Top bar */}
      <div className="lp-topbar">
        <div className="lp-topbar-logo">
          <svg viewBox="0 0 40 24" fill="none" width="28" height="17">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <span className="lp-topbar-brand">BEAVERTOWN</span>
        </div>
        <button className="lp-topbar-admin" onClick={go} title="Admin Portal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          Admin
        </button>
      </div>

      <div className="lp-body">
        {/* Crown + Logo */}
        <div className="lp-logo">
          <svg viewBox="0 0 50 30" width="52" height="31" fill="none">
            <path d="M2 28L9 8L25 18L41 8L48 28H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="25" cy="17" r="3.5" fill="#c0392b"/>
            <circle cx="9" cy="7" r="2.5" fill="#D4A017"/>
            <circle cx="41" cy="7" r="2.5" fill="#D4A017"/>
          </svg>
          <span className="lp-brand">BEAVERTOWN</span>
          <span className="lp-sub">— THE KING'S PLACE —</span>
        </div>

        <p className="lp-welcome">Welcome to Beavertown — The King's Place.</p>

        <h1 className="lp-h1">
          <span className="lp-gold">EAT. PLAY.</span>
          <span className="lp-white">HANGOUT.</span>
        </h1>

        <p className="lp-desc">
          Food, games, cricket, celebrations and good times —<br />
          <em>all under one roof.</em>
        </p>

        {/* Primary CTA */}
        <button className="lp-btn" onClick={go}>
          EXPLORE BEAVERTOWN
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        {/* Auth buttons */}
        <div className="lp-auth-row">
          <button className="lp-signin" onClick={go}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Sign In
          </button>
          <span className="lp-auth-sep">·</span>
          <button className="lp-signup" onClick={go}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            Create Account
          </button>
        </div>

        {/* Feature chips */}
        <div className="lp-chips">
          {['🍔 9 STALLS', '🏏 BOX CRICKET', '🎮 GAMING', '📅 EVENTS', '🛋️ CHILL ZONE'].map(c => (
            <span key={c} className="lp-chip">{c}</span>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="lp-footer">
        <svg viewBox="0 0 30 18" width="20" height="12" fill="none">
          <path d="M1 17L5 5L15 11L25 5L29 17H1Z" fill="#D4A017"/>
          <circle cx="15" cy="10" r="2" fill="#c0392b"/>
        </svg>
        <span>More Than Just a Place. It's a Vibe!</span>
      </div>
    </div>
  )
}
