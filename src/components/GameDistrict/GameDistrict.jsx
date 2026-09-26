import { useState, useEffect, useRef } from 'react'
import './GameDistrict.css'

const games = [
  { name: 'PS5',           desc: '1–4 players · 1 hr', price: '₹299', img: '/images/game-ps5.jpg',        bg: '#0a0a20' },
  { name: 'RACING',        desc: '1–2 players · 1 hr', price: '₹199', img: '/images/game-racing.jpg',     bg: '#200a00' },
  { name: 'FIFA / FOOTBALL', desc: '2–4 players · 1 hr', price: '₹249', img: '/images/game-fifa.jpg',    bg: '#001a0a' },
  { name: 'MULTIPLAYER',   desc: '2–8 players · 1 hr', price: '₹349', img: '/images/game-multi.jpg',     bg: '#15001a' },
  { name: 'ARCADE / OTHER',desc: '1–4 players · 1 hr', price: '₹149', img: '/images/game-arcade.jpg',    bg: '#1a1200' },
]

export default function GameDistrict() {
  const ref = useRef(null)
  const [form, setForm] = useState({ date: '', game: 'PS5', time: '10:00 AM', players: '1', duration: '1 Hour' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000) }

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? []
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section gaming-section section-alt" id="games" ref={ref}>
      <div className="gaming-bg" />
      <div className="gaming-overlay" />
      <div className="container gaming-inner">
        <div className="section-label fade-up">ENTER THE GAME DISTRICT.</div>
        <h2 className="section-heading fade-up">
          LEVEL UP YOUR <span className="gold">BATTLEFORT.</span>
        </h2>
        <p className="section-sub fade-up">Your play. Your street. Your rules.</p>

        <div className="games-grid">
          {games.map(({ name, desc, price, img, bg }, i) => (
            <div key={name} className="game-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="game-img" style={{ backgroundImage: `url('${img}')`, backgroundColor: bg }} />
              <div className="game-body">
                <h3>{name}</h3>
                <p>{desc}</p>
                <div className="game-footer">
                  <span className="game-price">{price}</span>
                  <button className="btn btn-primary btn-sm">
                    PLAY NOW
                    <span className="arrow"><ArrowIcon /></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking panel */}
        <div className="booking-card gaming-book fade-up">
          <h4>BOOK YOUR GAMING SESSION</h4>
          <form className="gbp-form" onSubmit={handleSubmit}>
            <div className="bc-field">
              <label className="form-label">Date</label>
              <input name="date" type="date" className="form-input" value={form.date} onChange={handleChange} required />
            </div>
            <div className="bc-field">
              <label className="form-label">Game</label>
              <select name="game" className="form-input" value={form.game} onChange={handleChange}>
                {games.map(g => <option key={g.name}>{g.name}</option>)}
              </select>
            </div>
            <div className="bc-row">
              <div className="bc-field">
                <label className="form-label">Time</label>
                <select name="time" className="form-input" value={form.time} onChange={handleChange}>
                  {['10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="bc-field">
                <label className="form-label">Players</label>
                <select name="players" className="form-input" value={form.players} onChange={handleChange}>
                  {['1','2','3','4'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="bc-field">
              <label className="form-label">Duration</label>
              <select name="duration" className="form-input" value={form.duration} onChange={handleChange}>
                <option>1 Hour</option><option>2 Hours</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              {submitted ? '✓ SESSION BOOKED!' : 'BOOK NOW →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
