import { useState, useEffect, useRef } from 'react'
import './FoodOrdering.css'

const steps = [
  { label: 'SCAN QR',      icon: <QrIcon /> },
  { label: 'CHOOSE STALL', icon: <StallIcon /> },
  { label: 'EXPLORE MENU', icon: <MenuIcon /> },
  { label: 'ADD TO ORDER', icon: <CartIcon /> },
  { label: 'ENJOY AT TABLE', icon: <CupIcon /> },
]

const defaultItems = [
  { stall: 'The Burger Club',  name: 'Burger Club',    price: 140, qty: 1 },
  { stall: 'Napoletana Pizza', name: 'Pizza Spot',      price: 180, qty: 1 },
  { stall: 'Blue Lagoon',      name: 'Beverage Bar',    price: 120, qty: 1 },
]

export default function FoodOrdering() {
  const ref = useRef(null)
  const [items, setItems] = useState(defaultItems)

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const updateQty = (i, delta) => {
    setItems(prev => {
      const next = [...prev]
      next[i] = { ...next[i], qty: Math.max(1, next[i].qty + delta) }
      return next
    })
  }

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.fade-up') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section ordering-section section-alt" id="ordering" ref={ref}>
      <div className="container">
        <div className="section-label fade-up">FOOD ORDERING EXPERIENCE</div>
        <h2 className="section-heading fade-up">
          ONE TABLE. <span className="gold">EVERY FLAVOUR.</span>
        </h2>
        <p className="section-sub fade-up">
          Customers can scan the table QR code and order from multiple stalls.<br />
          Just order from your table.
        </p>

        {/* Steps */}
        <div className="order-steps fade-up">
          {steps.map(({ label, icon }, i) => (
            <div key={label} className="steps-wrap">
              <div className="order-step">
                <div className="os-icon">{icon}</div>
                <span className="os-label">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="os-arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order UI */}
        <div className="order-ui fade-up">
          {/* Table QR */}
          <div className="order-qr-card">
            <div className="oqc-header">
              <span className="oqc-label">Table</span>
              <span className="oqc-num">12</span>
            </div>
            <div className="oqc-qr">
              <svg viewBox="0 0 80 80" width="84" height="84" fill="none">
                <rect x="2" y="2" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2.2"/>
                <rect x="8" y="8" width="18" height="18" fill="#D4A017" rx="1.5"/>
                <rect x="48" y="2" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2.2"/>
                <rect x="54" y="8" width="18" height="18" fill="#D4A017" rx="1.5"/>
                <rect x="2" y="48" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2.2"/>
                <rect x="8" y="54" width="18" height="18" fill="#D4A017" rx="1.5"/>
                <rect x="40" y="40" width="6" height="6" fill="#D4A017"/>
                <rect x="50" y="40" width="6" height="6" fill="#D4A017"/>
                <rect x="60" y="40" width="6" height="6" fill="#D4A017"/>
                <rect x="40" y="50" width="6" height="6" fill="#D4A017"/>
                <rect x="60" y="50" width="6" height="6" fill="#D4A017"/>
                <rect x="50" y="60" width="6" height="6" fill="#D4A017"/>
                <rect x="40" y="70" width="6" height="6" fill="#D4A017"/>
                <rect x="60" y="70" width="6" height="6" fill="#D4A017"/>
              </svg>
            </div>
            <p className="oqc-scan">Scan to order</p>
          </div>

          {/* Cart */}
          <div className="order-cart-card">
            <div className="occ-header">
              <span>Your Order</span>
              <span className="occ-count">{items.length} items</span>
            </div>
            <div className="occ-items">
              {items.map((item, i) => (
                <div key={i} className="occ-item">
                  <div className="occi-info">
                    <span className="occi-name">{item.name}</span>
                    <span className="occi-stall">{item.stall}</span>
                  </div>
                  <div className="occi-qty">
                    <button onClick={() => updateQty(i, -1)}>−</button>
                    <span>×{item.qty}</span>
                    <button onClick={() => updateQty(i, +1)}>+</button>
                  </div>
                  <span className="occi-price">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="occ-total">
              <span>Cart ({items.length} items)</span>
              <span className="occ-total-price">₹{total}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
              VIEW CART →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function QrIcon()    { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" aria-hidden="true"><rect x="7" y="2" width="10" height="16" rx="2"/><path d="M9 6h6M9 9h4"/><rect x="9" y="13" width="6" height="6" rx="0.5"/></svg> }
function StallIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" aria-hidden="true"><path d="M4 6h16M4 10h16M4 14h10"/><rect x="13" y="10" width="8" height="9" rx="1"/></svg> }
function MenuIcon()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" aria-hidden="true"><path d="M4 6h16M4 10h16M4 14h16M4 18h10"/></svg> }
function CartIcon()  { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> }
function CupIcon()   { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> }
