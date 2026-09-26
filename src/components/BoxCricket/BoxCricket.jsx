import { useState, useEffect, useRef } from 'react'
import './BoxCricket.css'

const features = [
  { label: 'Box Cricket', icon: <CricketIcon /> },
  { label: 'Team Play',   icon: <TeamIcon /> },
  { label: 'Slot Booking',icon: <CalIcon /> },
  { label: 'Tournaments', icon: <TrophyIcon /> },
]

export default function BoxCricket() {
  const ref = useRef(null)
  const [form, setForm] = useState({ date: '', court: 'Court A', time: '10:00 AM', players: '6', duration: '1 Hour' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000) }

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
    <section className="section cricket-section" id="cricket" ref={ref}>
      <div className="cricket-bg" />
      <div className="cricket-overlay" />
      <div className="container cricket-inner">

        {/* Content */}
        <div className="cricket-content fade-up">
          <div className="section-label">BOX CRICKET</div>
          <h2 className="section-heading">
            RULE THE <span className="gold">KING'S ARENA.</span>
          </h2>
          <p className="section-sub">Your team. Your game. Your moment.</p>

          <div className="cricket-feats">
            {features.map(({ label, icon }) => (
              <div key={label} className="cf-item">
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="cricket-btns">
            <button className="btn btn-primary btn-lg" onClick={() => document.querySelector('.bc-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
              BOOK BOX CRICKET
              <span className="arrow"><ArrowIcon /></span>
            </button>
            <button className="btn btn-secondary btn-lg">
              VIEW AVAILABLE SLOTS
            </button>
          </div>
        </div>

        {/* Booking form */}
        <div className="booking-card bc-form fade-up" style={{ transitionDelay: '0.3s' }}>
          <h4>Book Your Slot</h4>
          <form onSubmit={handleSubmit}>
            <div className="bc-field">
              <label className="form-label">Date</label>
              <input name="date" type="date" className="form-input" value={form.date} onChange={handleChange} required />
            </div>
            <div className="bc-field">
              <label className="form-label">Select Court</label>
              <select name="court" className="form-input" value={form.court} onChange={handleChange}>
                <option>Court A — Full Size</option>
                <option>Court B — Half Size</option>
              </select>
            </div>
            <div className="bc-row">
              <div className="bc-field">
                <label className="form-label">Time</label>
                <select name="time" className="form-input" value={form.time} onChange={handleChange}>
                  {['10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM','08:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="bc-field">
                <label className="form-label">Players</label>
                <select name="players" className="form-input" value={form.players} onChange={handleChange}>
                  {['6','8','10','12'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="bc-field">
              <label className="form-label">Duration</label>
              <select name="duration" className="form-input" value={form.duration} onChange={handleChange}>
                <option>1 Hour</option><option>2 Hours</option><option>3 Hours</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {submitted ? '✓ BOOKING CONFIRMED!' : 'BOOK NOW →'}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

function CricketIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><line x1="5" y1="19" x2="15" y2="9" strokeLinecap="round"/><path d="M15 9l2-4 2 2-4 2z" fill="#D4A017"/><circle cx="4.5" cy="19.5" r="1.5" fill="#D4A017"/></svg> }
function TeamIcon()    { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="17" cy="11" r="3"/><path d="M21 21v-2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2"/></svg> }
function CalIcon()     { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function TrophyIcon()  { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> }
function ArrowIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
