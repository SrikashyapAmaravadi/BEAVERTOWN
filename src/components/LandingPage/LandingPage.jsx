import { useState } from 'react'
import './LandingPage.css'

export default function LandingPage({ onEnter }) {
  const [out, setOut] = useState(false)
  const go = () => { setOut(true); setTimeout(onEnter, 600) }

  return (
    <div className={`lp${out ? ' lp-out' : ''}`} onClick={go}>
      <div className="lp-bg" />
      <div className="lp-overlay" />

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

        <button className="lp-btn" onClick={go}>
          EXPLORE BEAVERTOWN
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <div className="lp-chips">
          {['🍔 9 STALLS','🏏 BOX CRICKET','🎮 GAMING','📅 EVENTS','🛋️ CHILL ZONE'].map(c => (
            <span key={c} className="lp-chip">{c}</span>
          ))}
        </div>
      </div>

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
