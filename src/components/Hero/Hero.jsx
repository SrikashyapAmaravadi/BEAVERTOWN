import { useEffect, useRef } from 'react'
import './Hero.css'

const featureItems = [
  { label: 'FOOD STALLS',  icon: <FoodIcon /> },
  { label: 'BOX CRICKET',  icon: <CricketIcon /> },
  { label: 'GAMING ZONE',  icon: <GameIcon /> },
  { label: 'EVENTS',       icon: <EventIcon /> },
  { label: 'SEATING AREA', icon: <SofaIcon /> },
]

const barItems = [
  { label: '9 STALLS',     icon: <BagIcon /> },
  { label: 'BOX CRICKET',  icon: <CricketIcon /> },
  { label: 'GAMING WORLD', icon: <GameIcon /> },
  { label: 'EVENTS',       icon: <EventIcon /> },
  { label: 'CHILL ZONE',   icon: <SofaIcon /> },
]

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-overlay" />

      <div className="hero-inner container">
        {/* LEFT — copy */}
        <div className="hero-content">
          <p className="hero-welcome">Welcome to Beavertown — The King's Place.</p>
          <h1 className="hero-headline">
            <span className="gold-line">EAT. PLAY.</span>
            <span className="white-line">HANGOUT.</span>
          </h1>
          <p className="hero-desc">
            Food, games, cricket, celebrations and good times —<br />
            <span>all under one roof.</span>
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('#experience')}>
              <MenuIcon />
              EXPLORE BEAVERTOWN
              <span className="arrow"><ArrowIcon /></span>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => scrollTo('#book')}>
              <CalIcon />
              BOOK YOUR EXPERIENCE
              <span className="arrow"><ArrowIcon /></span>
            </button>
          </div>
        </div>

        {/* RIGHT — feature panel */}
        <aside className="hero-panel" aria-label="Venue highlights">
          <ul className="hero-panel-list">
            {featureItems.map(({ label, icon }) => (
              <li key={label} className="hero-panel-item">
                <span className="hpi-icon">{icon}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Bottom-right tagline */}
      <div className="hero-tagline" aria-hidden="true">
        <CrownMini />
        <p>More Than<br /><em>Just a Place.</em><br />It's a Vibe!</p>
      </div>

      {/* Feature bar */}
      <div className="hero-bar">
        <div className="hero-bar-inner container">
          {barItems.map(({ label, icon }, i) => (
            <div key={label} className="hero-bar-wrap">
              <div className="hero-bar-item">
                {icon}
                <span>{label}</span>
              </div>
              {i < barItems.length - 1 && <div className="bar-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Inline SVG icons ───────────────────────── */
function FoodIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/><path d="M3 9a9 9 0 0 1 18 0" strokeLinecap="round"/></svg>
}
function CricketIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><line x1="5" y1="19" x2="15" y2="9" strokeLinecap="round"/><path d="M15 9l2-4 2 2-4 2z" fill="#D4A017"/><circle cx="4.5" cy="19.5" r="1.5" fill="#D4A017"/></svg>
}
function GameIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="7" width="20" height="12" rx="5"/><line x1="12" y1="11" x2="12" y2="15" strokeLinecap="round"/><line x1="10" y1="13" x2="14" y2="13" strokeLinecap="round"/><circle cx="17" cy="11.5" r="1" fill="#D4A017"/><circle cx="19" cy="13.5" r="1" fill="#D4A017"/></svg>
}
function EventIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function SofaIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><path d="M2 11a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3H2v-3z"/><path d="M17 11a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3h-5v-3z"/><rect x="4" y="14" width="16" height="4" rx="1"/></svg>
}
function BagIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="8" width="20" height="12" rx="2"/><path d="M7 8V6a5 5 0 0 1 10 0v2"/></svg>
}
function MenuIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
}
function CalIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
function CrownMini() {
  return <svg viewBox="0 0 30 18" width="26" height="16" fill="none" aria-hidden="true"><path d="M1 17L5 5L15 11L25 5L29 17H1Z" fill="#D4A017"/><circle cx="15" cy="10" r="2" fill="#c0392b"/></svg>
}
