import { useEffect, useRef } from 'react'
import './FoodStreet.css'

const stalls = [
  { num: '01', name: 'THE BURGER CLUB',  desc: 'Burgers · Fries · Shakes',       img: '/images/stall-01.jpg', bg: '#1a0e00' },
  { num: '02', name: 'SPICY DHAMAKA',    desc: 'Chinese · Grills · Rolls',        img: '/images/stall-02.jpg', bg: '#1a0500' },
  { num: '03', name: 'THE PIZZA SPOT',   desc: 'Pizza · Pasta · More',            img: '/images/stall-03.jpg', bg: '#12001a' },
  { num: '04', name: 'SOUTH BITES',      desc: 'Dosas · Idlis · Meals',           img: '/images/stall-04.jpg', bg: '#001a0e' },
  { num: '05', name: 'CHINESE WOK',      desc: 'Noodles · Rice · Momo',           img: '/images/stall-05.jpg', bg: '#0e1a00' },
  { num: '06', name: 'THE GRILL HOUSE',  desc: 'Grills · Kebabs · BBQ',           img: '/images/stall-06.jpg', bg: '#1a0800' },
  { num: '07', name: 'SWEET KINGDOM',    desc: 'Desserts · Waffles · Shakes',     img: '/images/stall-07.jpg', bg: '#0a0015' },
  { num: '08', name: 'STREET BITES',     desc: 'Street Food · Snacks · Chaat',    img: '/images/stall-08.jpg', bg: '#001512' },
  { num: '09', name: 'BEVERAGE BAR',     desc: 'Mocktails · Coolers · Drinks',    img: '/images/stall-09.jpg', bg: '#15100a' },
]

export default function FoodStreet() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section food-section" id="food" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">THE FOOD STREET.</div>
        <h2 className="section-heading fade-up">
          NINE STALLS. <span className="gold">ENDLESS CRAVINGS.</span>
        </h2>
        <div className="stalls-grid">
          {stalls.map(({ num, name, desc, img, bg }, i) => (
            <div
              key={num}
              className="stall-card fade-up"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="stall-num">{num}</div>
              <div
                className="stall-img"
                style={{ backgroundImage: `url('${img}')`, backgroundColor: bg }}
              />
              <div className="stall-body">
                <h3>{name}</h3>
                <p>{desc}</p>
                <a href="#" className="btn-outline-sm" onClick={e => e.preventDefault()}>
                  VIEW MENU
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
