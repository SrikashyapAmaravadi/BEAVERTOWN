import { useState, useEffect } from 'react'
import './Header.css'

const navLinks = [
  { label: 'HOME',    href: '#hero' },
  { label: 'FOOD',    href: '#food' },
  { label: 'GAMES',   href: '#games' },
  { label: 'CRICKET', href: '#cricket' },
  { label: 'EVENTS',  href: '#events' },
  { label: 'ABOUT',   href: '#about' },
]

export default function Header({ onLogoClick }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('#hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close drawer when clicking outside
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (!e.target.closest('.site-header')) setMenuOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [menuOpen])

  const scrollTo = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 62, behavior: 'smooth' })
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="site-header">
      <div className="header-inner">

        {/* Logo */}
        <button className="header-logo" onClick={onLogoClick} aria-label="Beavertown home">
          <svg className="logo-crown" viewBox="0 0 40 24" fill="none" aria-hidden="true">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <div className="logo-text">
            <span className="logo-brand">BEAVERTOWN</span>
            <span className="logo-sub">THE KING'S PLACE</span>
          </div>
        </button>

        {/* Desktop nav (hidden on mobile) */}
        <nav className="header-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={`nav-link${activeLink === href ? ' active' : ''}`}
                  onClick={e => { e.preventDefault(); scrollTo(href) }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Book Now + Hamburger */}
        <div className="header-right">
          <a href="#cricket" className="btn btn-primary btn-sm header-book"
            onClick={e => { e.preventDefault(); scrollTo('#cricket') }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            BOOK NOW →
          </a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} aria-label="Menu" aria-expanded={menuOpen}
            onClick={() => setMenuOpen(p => !p)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Slide-down mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen} id="mobile-menu">
        <ul className="mobile-nav-list">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className={`mobile-nav-link${activeLink === href ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); scrollTo(href) }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#cricket" className="btn btn-primary mobile-book" onClick={e => { e.preventDefault(); scrollTo('#cricket'); setMenuOpen(false) }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          BOOK YOUR EXPERIENCE →
        </a>
      </div>
    </header>
  )
}
