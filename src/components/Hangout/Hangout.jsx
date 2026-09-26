import { useEffect, useRef } from 'react'
import './Hangout.css'

const feats = [
  { label: 'Premium Seating', icon: <SofaIcon /> },
  { label: 'Food & Drinks',   icon: <CupIcon /> },
  { label: 'Chill Ambience',  icon: <StarIcon /> },
  { label: 'Live Music',      icon: <MusicIcon /> },
]

export default function Hangout() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? []
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section hangout-section" id="hangout" ref={ref}>
      <div className="hangout-bg" />
      <div className="hangout-overlay" />
      <div className="container hangout-inner">
        <div className="hangout-content fade-up">
          <div className="section-label">HANGOUT</div>
          <h2 className="section-heading hangout-h">
            YOUR TABLE.<br />
            <span className="gold">YOUR PEOPLE.</span><br />
            YOUR VIBE.
          </h2>
          <p className="section-sub">
            Kick back, share good food, and enjoy the warm cinematic ambience of The King's Deck.
          </p>
          <div className="hang-feats">
            {feats.map(({ label, icon }) => (
              <div key={label} className="hang-feat">
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" style={{ marginTop: '36px' }}>
            RESERVE YOUR TABLE
            <span className="arrow"><ArrowIcon /></span>
          </button>
        </div>
      </div>
    </section>
  )
}

function SofaIcon()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><path d="M2 11a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3H2v-3z"/><path d="M17 11a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3h-5v-3z"/><rect x="4" y="14" width="16" height="4" rx="1"/></svg> }
function CupIcon()   { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg> }
function StarIcon()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> }
function MusicIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> }
function ArrowIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
