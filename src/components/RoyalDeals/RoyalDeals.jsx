import { useEffect, useRef } from 'react'
import './RoyalDeals.css'

const deals = [
  { badge: 'FOOD COMBO',      save: 'SAVE 20%', title: 'Food Combo',         desc: 'Any 3 stalls · One order',          price: '₹499',  featured: false },
  { badge: 'BEST VALUE',      save: 'SAVE 30%', title: 'Game Night',         desc: 'Food + Games · 3 Hours',            price: '₹899',  featured: true  },
  { badge: 'CRICKET + FOOD',  save: 'SAVE 25%', title: 'Cricket Special',    desc: 'Box Cricket + Meal',                price: '₹699',  featured: false },
  { badge: 'STUDENT SPECIAL', save: 'SAVE 15%', title: 'Student Special',    desc: 'Show student ID · Valid Thursdays', price: '₹399',  featured: false },
  { badge: 'FAMILY COMBO',    save: 'SAVE 20%', title: 'Family Combo',       desc: '4+ people · Food + Games',          price: '₹1499', featured: false },
]

export default function RoyalDeals() {
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
    <section className="section deals-section section-alt" id="deals" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">ROYAL DEALS.</div>
        <h2 className="section-heading fade-up">
          THE KING'S <span className="gold">OFFERS.</span>
        </h2>
        <div className="deals-grid">
          {deals.map(({ badge, save, title, desc, price, featured }, i) => (
            <div
              key={title}
              className={`deal-card fade-up${featured ? ' deal-featured' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="deal-top">
                <span className={`deal-badge${featured ? ' badge-gold' : ''}`}>{badge}</span>
                <span className={`deal-save${featured ? ' save-gold' : ''}`}>{save}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="deal-footer">
                <span className="deal-price">From <strong>{price}</strong></span>
                <button className="btn btn-primary btn-sm">
                  GRAB DEAL
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
