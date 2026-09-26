import { useEffect, useRef } from 'react'
import './EventsSection.css'

const events = [
  { badge: 'GAMING',  title: 'WEEKEND GAME NIGHT',    desc: 'Every Friday & Saturday · 7 PM onwards',  img: '/images/event-gaming.jpg',  bg: '#0a0a20' },
  { badge: 'CRICKET', title: 'BOX CRICKET CHALLENGE', desc: 'Register your team · Compete for glory',   img: '/images/event-cricket.jpg', bg: '#001a08' },
  { badge: 'OFFER',   title: 'STUDENT NIGHT',         desc: 'Special discounts every Thursday',         img: '/images/event-student.jpg', bg: '#150a00' },
  { badge: 'FOOD',    title: 'FOOD FESTIVAL',         desc: 'All 9 stalls · Special menus · Live music', img: '/images/event-food.jpg',    bg: '#1a0800' },
]

export default function EventsSection() {
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
    <section className="section events-section" id="events" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">WHAT'S HAPPENING IN BEAVERTOWN?</div>
        <h2 className="section-heading fade-up">
          DON'T MISS <span className="gold">THE ACTION.</span>
        </h2>
        <div className="events-grid">
          {events.map(({ badge, title, desc, img, bg }, i) => (
            <div key={title} className="event-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="event-img" style={{ backgroundImage: `url('${img}')`, backgroundColor: bg }}>
                <span className="event-badge">{badge}</span>
              </div>
              <div className="event-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <button className="btn btn-primary btn-sm">
                  JOIN NOW
                  <span className="arrow"><ArrowIcon /></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
