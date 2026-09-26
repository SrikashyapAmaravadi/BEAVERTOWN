import { useEffect, useRef } from 'react'
import './Experience.css'

const cards = [
  { title: 'FOOD STREET',       desc: '9 stalls, endless cravings',        href: '#food',         img: '/images/exp-food.jpg',       bg: '#1a0e00' },
  { title: 'GAME DISTRICT',     desc: 'PS5, racing, multiplayer',           href: '#games',        img: '/images/exp-games.jpg',      bg: '#0a0a1f' },
  { title: "KING'S ARENA",      desc: 'Box cricket, tournaments',           href: '#cricket',      img: '/images/exp-cricket.jpg',    bg: '#001a0a' },
  { title: 'CELEBRATION HOUSE', desc: 'Birthdays & more',                   href: '#celebrations', img: '/images/exp-celeb.jpg',      bg: '#1a0010' },
  { title: "KING'S DECK",       desc: 'Chill, hangout, your vibe',          href: '#hangout',      img: '/images/exp-hangout.jpg',    bg: '#100f00' },
]

export default function Experience() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  return (
    <section className="section experience-section" id="experience" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">EXPERIENCE BEAVERTOWN</div>
        <h2 className="section-heading fade-up">
          EACH VISIT. <span className="gold">A NEW ADVENTURE.</span>
        </h2>
        <div className="exp-grid">
          {cards.map(({ title, desc, href, img, bg }, i) => (
            <div
              key={title}
              className="exp-card fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="exp-card-img" style={{ backgroundImage: `url('${img}')`, backgroundColor: bg }} />
              <div className="exp-card-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="link-explore" onClick={() => scrollTo(href)}>
                  Explore
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
