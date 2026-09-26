import { useEffect, useRef } from 'react'
import './CelebrationHouse.css'

const types = [
  { emoji: '🎂', title: 'Birthdays',           desc: 'Make your special day unforgettable', img: '/images/celeb-birthday.jpg',  bg: '#1a0010' },
  { emoji: '💼', title: 'Corporate Events',    desc: 'Team outings and corporate fun',       img: '/images/celeb-corporate.jpg', bg: '#001018' },
  { emoji: '🏆', title: 'Team Events',         desc: 'Build bonds, compete together',        img: '/images/celeb-team.jpg',      bg: '#001500' },
  { emoji: '🥂', title: 'Private Celebrations',desc: 'Exclusive spaces for your people',     img: '/images/celeb-private.jpg',   bg: '#15100a' },
  { emoji: '✨', title: 'Special Events',      desc: 'Anniversaries, proposals & more',      img: '/images/celeb-special.jpg',   bg: '#1a0a0a' },
]

export default function CelebrationHouse() {
  const ref = useRef(null)

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
    <section className="section celeb-section" id="celebrations" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">CELEBRATION HOUSE</div>
        <h2 className="section-heading fade-up">
          MAKE EVERY MOMENT <span className="gold">A MEMORY.</span>
        </h2>
        <div className="celeb-grid">
          {types.map(({ emoji, title, desc, img, bg }, i) => (
            <div key={title} className="celeb-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="celeb-img" style={{ backgroundImage: `url('${img}')`, backgroundColor: bg }} />
              <div className="celeb-body">
                <div className="celeb-emoji">{emoji}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="link-explore">
                  Plan Now
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="celeb-cta fade-up">
          <button className="btn btn-primary btn-lg">
            PLAN YOUR EVENT
            <span className="arrow"><ArrowIcon /></span>
          </button>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
