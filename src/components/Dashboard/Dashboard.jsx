import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { IMG } from '../../imageUrls.js'
import './Dashboard.css'

/* ── helpers ─────────────────────────────────── */
function scrollTo(id) {
  const el = document.querySelector(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 62, behavior: 'smooth' })
}

function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('shown')),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Toast helper ─────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([])
  const show = (msg, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }
  return { toasts, show }
}

function ToastContainer({ toasts }) {
  return (
    <div style={{position:'fixed',bottom:80,right:16,zIndex:9000,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type==='success' ? 'rgba(46,204,113,.95)' : 'rgba(231,76,60,.95)',
          color:'#fff', borderRadius:12, padding:'12px 18px',
          fontFamily:'var(--font-heading)', fontSize:'.82rem', fontWeight:600,
          letterSpacing:'.06em', boxShadow:'0 4px 20px rgba(0,0,0,.4)',
          animation:'toastIn .3s ease', backdropFilter:'blur(8px)',
        }}>
          {t.type==='success' ? '✓ ' : '✗ '}{t.msg}
        </div>
      ))}
    </div>
  )
}

/* ── Booking save helper ──────────────────────── */
function saveBooking(booking) {
  const existing = JSON.parse(localStorage.getItem('bt_my_bookings') || '[]')
  localStorage.setItem('bt_my_bookings', JSON.stringify([booking, ...existing]))
}
const Ico = {
  arrow: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  cal:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  home:  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  food:  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  game:  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="12" rx="5"/><line x1="12" y1="11" x2="12" y2="15" strokeLinecap="round"/><line x1="10" y1="13" x2="14" y2="13" strokeLinecap="round"/><circle cx="17" cy="11.5" r="1" fill="currentColor"/></svg>,
  bat:   <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="19" x2="15" y2="9"/><path d="M15 9l2-4 2 2-4 2z" fill="currentColor"/><circle cx="4.5" cy="19.5" r="1.5" fill="currentColor"/></svg>,
  event: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
}

/* ════════════════════════════════════════════════
   DASHBOARD ROOT
════════════════════════════════════════════════ */
export default function Dashboard({ onLogoClick, onSignIn, onLogout }) {
  const [activeTab, setActiveTab] = useState('#hero')
  const { toasts, show: showToast } = useToast()

  // track active section for bottom nav
  useEffect(() => {
    const secs = ['#hero','#food','#games','#cricket','#events']
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveTab('#' + e.target.id) })
    }, { threshold: 0.3 })
    secs.forEach(id => { const el = document.querySelector(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const navTo = (id) => { setActiveTab(id); scrollTo(id) }

  return (
    <div className="dashboard">
      <TopHeader onLogoClick={onLogoClick} onSignIn={onSignIn} onLogout={onLogout} />
      <main>
        <HeroSection onSignIn={onSignIn} />
        <ExperienceSection />
        <FoodSection />
        <OrderingSection />
        <CricketSection showToast={showToast} />
        <GamingSection  showToast={showToast} />
        <HangoutSection />
        <CelebSection />
        <EventsSection />
        <DealsSection />
        <MyBookingsSection />
        <FooterSection />
      </main>
      <nav className="bottom-nav" aria-label="Navigation">
        {[
          { id:'#hero',    label:'Home',    icon: Ico.home  },
          { id:'#food',    label:'Food',    icon: Ico.food  },
          { id:'#games',   label:'Games',   icon: Ico.game  },
          { id:'#cricket', label:'Cricket', icon: Ico.bat   },
          { id:'#events',  label:'Events',  icon: Ico.event },
        ].map(({ id, label, icon }) => (
          <button key={id} className={`bn-btn${activeTab===id?' active':''}`} onClick={() => navTo(id)} aria-label={label}>
            <span className="bn-ico">{icon}</span>
            <span className="bn-lbl">{label}</span>
          </button>
        ))}
      </nav>
      <ToastContainer toasts={toasts} />
    </div>
  )
}

/* ────────────────────────────────────────────────
   TOP HEADER
──────────────────────────────────────────────── */
function TopHeader({ onLogoClick, onSignIn, onLogout }) {
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    {l:'HOME',h:'#hero'},{l:'FOOD',h:'#food'},{l:'GAMES',h:'#games'},
    {l:'CRICKET',h:'#cricket'},{l:'EVENTS',h:'#events'},{l:'ABOUT',h:'#about'},
  ]

  return (
    <header className={`top-header${scrolled?' scrolled':''}`}>
      <div className="th-inner">
        <button className="th-logo" onClick={onLogoClick} aria-label="Home">
          <svg viewBox="0 0 40 24" fill="none" width="34" height="20">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <div>
            <span className="th-brand">BEAVERTOWN</span>
            <span className="th-sub">THE KING'S PLACE</span>
          </div>
        </button>

        {/* desktop nav */}
        <nav className="th-nav">
          {navLinks.map(({l,h})=>(
            <a key={l} href={h} className="th-link" onClick={e=>{e.preventDefault();scrollTo(h)}}>{l}</a>
          ))}
        </nav>

        <div className="th-right">
          {user ? (
            <div className="th-user">
              <div className="th-avatar">{user.name?.[0] ?? '?'}</div>
              <span className="th-uname">{user.name}</span>
              <button className="th-logout-btn" onClick={onLogout} title="Logout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          ) : (
            <button className="btn-gold th-book" onClick={onSignIn}>
              SIGN IN {Ico.arrow}
            </button>
          )}
          <button className={`hamburger${open?' open':''}`} onClick={()=>setOpen(p=>!p)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {open && (
        <div className="th-drawer">
          {navLinks.map(({l,h})=>(
            <a key={l} href={h} className="th-drawer-link" onClick={e=>{e.preventDefault();scrollTo(h);setOpen(false)}}>{l}</a>
          ))}
          {user ? (
            <button className="btn-ghost" style={{width:'100%',justifyContent:'center',marginTop:14}} onClick={()=>{onLogout();setOpen(false)}}>
              LOGOUT
            </button>
          ) : (
            <button className="btn-gold" style={{width:'100%',justifyContent:'center',marginTop:14}} onClick={()=>{onSignIn();setOpen(false)}}>
              SIGN IN {Ico.arrow}
            </button>
          )}
        </div>
      )}
    </header>
  )
}

/* ────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────── */
function HeroSection({ onSignIn }) {
  const { user } = useAuth()
  const bg = useRef(null)
  useEffect(()=>{
    const fn = () => { if(bg.current) bg.current.style.transform=`translateY(${window.scrollY*.25}px)` }
    window.addEventListener('scroll',fn,{passive:true})
    return ()=>window.removeEventListener('scroll',fn)
  },[])

  return (
    <section className="hero-sec" id="hero">
      <div className="hero-bg" ref={bg}/>
      <div className="hero-ov"/>
      <div className="hero-body">
        <p className="hero-welcome">Welcome to Beavertown — The King's Place.</p>
        <h1 className="hero-h1">
          <span className="hg">EAT. PLAY.</span>
          <span className="hw">HANGOUT.</span>
        </h1>
        <p className="hero-desc">Food, games, cricket, celebrations and good times — <span>all under one roof.</span></p>
        <div className="hero-btns">
          <button className="btn-gold" onClick={()=>scrollTo('#experience')}>
            EXPLORE BEAVERTOWN {Ico.arrow}
          </button>
          {user ? (
            <button className="btn-ghost" onClick={()=>scrollTo('#cricket')}>
              {Ico.cal} BOOK YOUR EXPERIENCE {Ico.arrow}
            </button>
          ) : (
            <button className="btn-ghost" onClick={onSignIn}>
              {Ico.cal} SIGN IN TO BOOK {Ico.arrow}
            </button>
          )}
        </div>
      </div>

      {/* right panel — hidden on small mobile, shown on tablet+ */}
      <aside className="hero-panel">
        {[['FOOD STALLS',Ico.food],['BOX CRICKET',Ico.bat],['GAMING ZONE',Ico.game],['EVENTS',Ico.event]].map(([l,i])=>(
          <div key={l} className="hp-row">
            <span className="hp-ico">{i}</span>
            <span>{l}</span>
          </div>
        ))}
      </aside>

      {/* feature bar */}
      <div className="hero-bar">
        {[['🛍️','9 STALLS'],['🏏','BOX CRICKET'],['🎮','GAMING WORLD'],['📅','EVENTS'],['🛋️','CHILL ZONE']].map(([e,l])=>(
          <div key={l} className="hb-item">
            <span className="hb-ico">{e}</span>
            <span className="hb-lbl">{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   EXPERIENCE
──────────────────────────────────────────────── */
const expCards = [
  {title:'FOOD STREET',       desc:'9 stalls, endless cravings',      href:'#food',        img:IMG.expFood,    bg:'#1a0e00'},
  {title:'GAME DISTRICT',     desc:'PS5, racing, multiplayer',         href:'#games',       img:IMG.expGames,   bg:'#0a0a1f'},
  {title:"KING'S ARENA",      desc:'Box cricket, tournaments',         href:'#cricket',     img:IMG.expCricket, bg:'#001a0a'},
  {title:'CELEBRATION HOUSE', desc:'Birthdays & more',                 href:'#celebrations',img:IMG.expCeleb,   bg:'#1a0010'},
  {title:"KING'S DECK",       desc:'Chill, hangout, your vibe',        href:'#hangout',     img:IMG.expHangout, bg:'#100f00'},
]
function ExperienceSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec exp-sec" id="experience" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">EXPERIENCE BEAVERTOWN</div>
        <h2 className="sec-h reveal">EACH VISIT. <span className="g">A NEW ADVENTURE.</span></h2>
        <div className="exp-grid">
          {expCards.map(({title,desc,href,img,bg},i)=>(
            <div key={title} className="exp-card reveal" style={{transitionDelay:`${i*.07}s`}}>
              <div className="exp-img" style={{backgroundImage:`url('${img}')`,backgroundColor:bg}}/>
              <div className="exp-body">
                <h3>{title}</h3><p>{desc}</p>
                <button className="lnk" onClick={()=>scrollTo(href)}>Explore {Ico.arrow}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   FOOD STREET
──────────────────────────────────────────────── */
const stalls = [
  {n:'01',name:'THE BURGER CLUB',  desc:'Burgers · Fries · Shakes',    img:IMG.stall01,bg:'#1a0e00'},
  {n:'02',name:'SPICY DHAMAKA',    desc:'Chinese · Grills · Rolls',     img:IMG.stall02,bg:'#1a0500'},
  {n:'03',name:'THE PIZZA SPOT',   desc:'Pizza · Pasta · More',         img:IMG.stall03,bg:'#12001a'},
  {n:'04',name:'SOUTH BITES',      desc:'Dosas · Idlis · Meals',        img:IMG.stall04,bg:'#001a0e'},
  {n:'05',name:'CHINESE WOK',      desc:'Noodles · Rice · Momo',        img:IMG.stall05,bg:'#0e1a00'},
  {n:'06',name:'THE GRILL HOUSE',  desc:'Grills · Kebabs · BBQ',        img:IMG.stall06,bg:'#1a0800'},
  {n:'07',name:'SWEET KINGDOM',    desc:'Desserts · Waffles · Shakes',  img:IMG.stall07,bg:'#0a0015'},
  {n:'08',name:'STREET BITES',     desc:'Street Food · Snacks · Chaat',img:IMG.stall08,bg:'#001512'},
  {n:'09',name:'BEVERAGE BAR',     desc:'Mocktails · Coolers · Drinks', img:IMG.stall09,bg:'#15100a'},
]
function FoodSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec food-sec" id="food" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">THE FOOD STREET.</div>
        <h2 className="sec-h reveal">NINE STALLS. <span className="g">ENDLESS CRAVINGS.</span></h2>
        <div className="stalls-grid">
          {stalls.map(({n,name,desc,img,bg},i)=>(
            <div key={n} className="stall-card reveal" style={{transitionDelay:`${i*.05}s`}}>
              <span className="stall-n">{n}</span>
              <div className="stall-img" style={{backgroundImage:`url('${img}')`,backgroundColor:bg}}/>
              <div className="stall-body">
                <h3>{name}</h3><p>{desc}</p>
                <button className="btn-outline">VIEW MENU {Ico.arrow}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   FOOD ORDERING
──────────────────────────────────────────────── */
function OrderingSection() {
  const ref = useRef(null); useReveal(ref)
  const [items, setItems] = useState([
    {name:'Burger Club',stall:'The Burger Club',price:140,qty:1},
    {name:'Pizza Spot', stall:'Napoletana Pizza',price:180,qty:1},
    {name:'Blue Lagoon',stall:'Beverage Bar',   price:120,qty:1},
  ])
  const upd = (i,d) => setItems(p=>{const n=[...p];n[i]={...n[i],qty:Math.max(1,n[i].qty+d)};return n})
  const total = items.reduce((s,it)=>s+it.price*it.qty,0)

  return (
    <section className="sec order-sec" id="ordering" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">FOOD ORDERING EXPERIENCE</div>
        <h2 className="sec-h reveal">ONE TABLE. <span className="g">EVERY FLAVOUR.</span></h2>
        <p className="sec-sub reveal">Scan the table QR code and order from multiple stalls — right from your seat.</p>

        <div className="order-steps reveal">
          {['SCAN QR','CHOOSE STALL','EXPLORE MENU','ADD TO ORDER','ENJOY AT TABLE'].map((s,i,a)=>(
            <div key={s} className="os-wrap">
              <div className="os-step"><span>{s}</span></div>
              {i<a.length-1&&<span className="os-arr">{Ico.arrow}</span>}
            </div>
          ))}
        </div>

        <div className="order-ui reveal">
          <div className="oq-card">
            <div className="oq-top"><span>Table</span><span className="oq-num">12</span></div>
            <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
              <rect x="2" y="2" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2"/>
              <rect x="8" y="8" width="18" height="18" fill="#D4A017" rx="1.5"/>
              <rect x="48" y="2" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2"/>
              <rect x="54" y="8" width="18" height="18" fill="#D4A017" rx="1.5"/>
              <rect x="2" y="48" width="30" height="30" rx="3" stroke="#D4A017" strokeWidth="2"/>
              <rect x="8" y="54" width="18" height="18" fill="#D4A017" rx="1.5"/>
              <rect x="40" y="40" width="6" height="6" fill="#D4A017"/>
              <rect x="50" y="40" width="6" height="6" fill="#D4A017"/>
              <rect x="60" y="40" width="6" height="6" fill="#D4A017"/>
              <rect x="40" y="50" width="6" height="6" fill="#D4A017"/>
              <rect x="60" y="60" width="6" height="6" fill="#D4A017"/>
            </svg>
            <p className="oq-scan">Scan to order</p>
          </div>

          <div className="oc-card">
            <div className="oc-hdr"><span>Your Order</span><span className="oc-cnt">{items.length} items</span></div>
            {items.map((it,i)=>(
              <div key={i} className="oc-row">
                <div className="oc-info"><b>{it.name}</b><small>{it.stall}</small></div>
                <div className="oc-qty">
                  <button onClick={()=>upd(i,-1)}>−</button>
                  <span>×{it.qty}</span>
                  <button onClick={()=>upd(i,+1)}>+</button>
                </div>
                <span className="oc-price">₹{it.price*it.qty}</span>
              </div>
            ))}
            <div className="oc-total"><span>Total</span><span className="oc-tot-p">₹{total}</span></div>
            <button className="btn-gold" style={{width:'100%',justifyContent:'center',marginTop:10}}>VIEW CART {Ico.arrow}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   BOX CRICKET
──────────────────────────────────────────────── */
function CricketSection({ showToast }) {
  const ref = useRef(null); useReveal(ref)
  const { user } = useAuth()
  const [form,setForm]=useState({date:'',court:'Court A',time:'10:00 AM',players:'6',dur:'1 Hour'})
  const [done,setDone]=useState(false)
  const sub = e => {
    e.preventDefault()
    if (!form.date) { showToast('Please select a date','error'); return }
    saveBooking({
      type:'cricket',
      title:`Box Cricket — ${form.court}`,
      date:form.date, time:form.time,
      players:`${form.players} players`,
      duration:form.dur,
      status:'pending',
      bookedAt: new Date().toISOString(),
    })
    setDone(true)
    showToast('Cricket slot booked! We will confirm shortly.')
    setTimeout(()=>setDone(false),3000)
  }

  return (
    <section className="sec cricket-sec" id="cricket" ref={ref}>
      <div className="cricket-bg"/><div className="cricket-ov"/>
      <div className="wrap cricket-inner">
        <div className="cricket-left reveal">
          <div className="sec-label">BOX CRICKET</div>
          <h2 className="sec-h">RULE THE <span className="g">KING'S ARENA.</span></h2>
          <p className="sec-sub">Your team. Your game. Your moment.</p>
          <div className="cf-row">
            {['Box Cricket','Team Play','Slot Booking','Tournaments'].map(f=>(
              <span key={f} className="cf-chip">{f}</span>
            ))}
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:24}}>
            <button className="btn-gold">BOOK BOX CRICKET {Ico.arrow}</button>
            <button className="btn-ghost">VIEW SLOTS</button>
          </div>
        </div>

        <div className="bk-card reveal" style={{transitionDelay:'.2s'}}>
          <h4 className="bk-title">Book Your Slot</h4>
          <form onSubmit={sub}>
            <div className="bf"><label className="fl">Date</label><input type="date" className="fi" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required/></div>
            <div className="bf"><label className="fl">Court</label>
              <select className="fi" value={form.court} onChange={e=>setForm(p=>({...p,court:e.target.value}))}>
                <option>Court A — Full Size</option><option>Court B — Half Size</option>
              </select>
            </div>
            <div className="bf-row">
              <div className="bf"><label className="fl">Time</label>
                <select className="fi" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}>
                  {['10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM','08:00 PM'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="bf"><label className="fl">Players</label>
                <select className="fi" value={form.players} onChange={e=>setForm(p=>({...p,players:e.target.value}))}>
                  {['6','8','10','12'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="bf"><label className="fl">Duration</label>
              <select className="fi" value={form.dur} onChange={e=>setForm(p=>({...p,dur:e.target.value}))}>
                <option>1 Hour</option><option>2 Hours</option><option>3 Hours</option>
              </select>
            </div>
            <button type="submit" className="btn-gold" style={{width:'100%',justifyContent:'center',marginTop:8}}>
              {done?'✓ CONFIRMED!':'BOOK NOW →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   GAMING DISTRICT
──────────────────────────────────────────────── */
const games = [
  {name:'PS5',          desc:'1–4 players',price:'₹299',img:IMG.gamePs5,   bg:'#0a0a20'},
  {name:'RACING',       desc:'1–2 players',price:'₹199',img:IMG.gameRacing,bg:'#200a00'},
  {name:'FIFA/FOOTBALL',desc:'2–4 players',price:'₹249',img:IMG.gameFifa,  bg:'#001a0a'},
  {name:'MULTIPLAYER',  desc:'2–8 players',price:'₹349',img:IMG.gameMulti, bg:'#15001a'},
  {name:'ARCADE/OTHER', desc:'1–4 players',price:'₹149',img:IMG.gameArcade,bg:'#1a1200'},
]
function GamingSection({ showToast }) {
  const ref = useRef(null); useReveal(ref)
  const [form,setForm]=useState({date:'',game:'PS5',time:'10:00 AM',players:'1',dur:'1 Hour'})
  const [done,setDone]=useState(false)
  const sub = e => {
    e.preventDefault()
    if (!form.date) { showToast('Please select a date','error'); return }
    saveBooking({
      type:'gaming',
      title:`${form.game} Gaming Session`,
      date:form.date, time:form.time,
      players:`${form.players} player${form.players>1?'s':''}`,
      duration:form.dur,
      status:'pending',
      bookedAt: new Date().toISOString(),
    })
    setDone(true)
    showToast('Gaming session booked! See you there.')
    setTimeout(()=>setDone(false),3000)
  }

  return (
    <section className="sec gaming-sec" id="games" ref={ref}>
      <div className="gaming-bg"/><div className="gaming-ov"/>
      <div className="wrap" style={{position:'relative',zIndex:2}}>
        <div className="sec-label reveal">ENTER THE GAME DISTRICT.</div>
        <h2 className="sec-h reveal">LEVEL UP YOUR <span className="g">BATTLEFORT.</span></h2>
        <div className="games-grid">
          {games.map(({name,desc,price,img,bg},i)=>(
            <div key={name} className="game-card reveal" style={{transitionDelay:`${i*.07}s`}}>
              <div className="game-img" style={{backgroundImage:`url('${img}')`,backgroundColor:bg}}/>
              <div className="game-body">
                <h3>{name}</h3><p>{desc}</p>
                <div className="game-ft">
                  <span className="game-price">{price}</span>
                  <button className="btn-gold" style={{padding:'7px 14px',fontSize:'.72rem'}}>PLAY NOW {Ico.arrow}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bk-card reveal" style={{maxWidth:680,margin:'40px auto 0'}}>
          <h4 className="bk-title">BOOK YOUR GAMING SESSION</h4>
          <form className="gbp-form" onSubmit={sub}>
            <div className="bf"><label className="fl">Date</label><input type="date" className="fi" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required/></div>
            <div className="bf"><label className="fl">Game</label>
              <select className="fi" value={form.game} onChange={e=>setForm(p=>({...p,game:e.target.value}))}>
                {games.map(g=><option key={g.name}>{g.name}</option>)}
              </select>
            </div>
            <div className="bf-row">
              <div className="bf"><label className="fl">Time</label>
                <select className="fi" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))}>
                  {['10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="bf"><label className="fl">Players</label>
                <select className="fi" value={form.players} onChange={e=>setForm(p=>({...p,players:e.target.value}))}>
                  {['1','2','3','4'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="btn-gold" style={{width:'100%',justifyContent:'center',marginTop:8}}>
              {done?'✓ SESSION BOOKED!':'BOOK NOW →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   HANGOUT
──────────────────────────────────────────────── */
function HangoutSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec hangout-sec" id="hangout" ref={ref}>
      <div className="hangout-bg"/><div className="hangout-ov"/>
      <div className="wrap" style={{position:'relative',zIndex:2,padding:'100px 20px'}}>
        <div className="sec-label reveal">HANGOUT</div>
        <h2 className="sec-h reveal" style={{fontSize:'clamp(2.2rem,8vw,4.5rem)',lineHeight:1}}>
          YOUR TABLE.<br/><span className="g">YOUR PEOPLE.</span><br/>YOUR VIBE.
        </h2>
        <p className="sec-sub reveal">Kick back and enjoy the warm cinematic ambience of The King's Deck.</p>
        <div className="hang-feats reveal">
          {['🛋️ Premium Seating','☕ Food & Drinks','✨ Chill Ambience','🎵 Live Music'].map(f=>(
            <span key={f} className="cf-chip">{f}</span>
          ))}
        </div>
        <button className="btn-gold reveal" style={{marginTop:28}} onClick={()=>scrollTo('#cricket')}>RESERVE YOUR TABLE {Ico.arrow}</button>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   CELEBRATIONS
──────────────────────────────────────────────── */
const celebs = [
  {e:'🎂',t:'Birthdays',         d:'Make your day unforgettable',    img:IMG.celebBirthday,  bg:'#1a0010'},
  {e:'💼',t:'Corporate Events',  d:'Team outings & corporate fun',    img:IMG.celebCorporate, bg:'#001018'},
  {e:'🏆',t:'Team Events',       d:'Build bonds, compete together',   img:IMG.celebTeam,      bg:'#001500'},
  {e:'🥂',t:'Private Parties',   d:'Exclusive space for your people', img:IMG.celebPrivate,   bg:'#15100a'},
  {e:'✨',t:'Special Events',    d:'Anniversaries, proposals & more', img:IMG.celebSpecial,   bg:'#1a0a0a'},
]
function CelebSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec celeb-sec" id="celebrations" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">CELEBRATION HOUSE</div>
        <h2 className="sec-h reveal">MAKE EVERY MOMENT <span className="g">A MEMORY.</span></h2>
        <div className="celeb-grid">
          {celebs.map(({e,t,d,img,bg},i)=>(
            <div key={t} className="celeb-card reveal" style={{transitionDelay:`${i*.07}s`}}>
              <div className="celeb-img" style={{backgroundImage:`url('${img}')`,backgroundColor:bg}}/>
              <div className="celeb-body">
                <span className="celeb-e">{e}</span>
                <h3>{t}</h3><p>{d}</p>
                <button className="lnk">Plan Now {Ico.arrow}</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:40}}>
          <button className="btn-gold">PLAN YOUR EVENT {Ico.arrow}</button>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   EVENTS
──────────────────────────────────────────────── */
const evts = [
  {badge:'GAMING', t:'WEEKEND GAME NIGHT',    d:'Every Fri & Sat · 7 PM',      img:IMG.eventGaming,  bg:'#0a0a20'},
  {badge:'CRICKET',t:'BOX CRICKET CHALLENGE', d:'Register your team now',       img:IMG.eventCricket, bg:'#001a08'},
  {badge:'OFFER',  t:'STUDENT NIGHT',         d:'Special discounts every Thu',  img:IMG.eventStudent, bg:'#150a00'},
  {badge:'FOOD',   t:'FOOD FESTIVAL',         d:'All 9 stalls · Live music',    img:IMG.eventFood,    bg:'#1a0800'},
]
function EventsSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec events-sec" id="events" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">WHAT'S HAPPENING IN BEAVERTOWN?</div>
        <h2 className="sec-h reveal">DON'T MISS <span className="g">THE ACTION.</span></h2>
        <div className="events-grid">
          {evts.map(({badge,t,d,img,bg},i)=>(
            <div key={t} className="ev-card reveal" style={{transitionDelay:`${i*.08}s`}}>
              <div className="ev-img" style={{backgroundImage:`url('${img}')`,backgroundColor:bg}}>
                <span className="ev-badge">{badge}</span>
              </div>
              <div className="ev-body">
                <h3>{t}</h3><p>{d}</p>
                <button className="btn-gold" style={{padding:'8px 18px',fontSize:'.78rem'}}>JOIN NOW {Ico.arrow}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   ROYAL DEALS
──────────────────────────────────────────────── */
const deals = [
  {badge:'FOOD COMBO',     save:'SAVE 20%',title:'Food Combo',      desc:'Any 3 stalls · One order',   price:'₹499', hot:false},
  {badge:'BEST VALUE',     save:'SAVE 30%',title:'Game Night',      desc:'Food + Games · 3 Hours',      price:'₹899', hot:true },
  {badge:'CRICKET + FOOD', save:'SAVE 25%',title:'Cricket Special', desc:'Box Cricket + Meal',          price:'₹699', hot:false},
  {badge:'STUDENT SPECIAL',save:'SAVE 15%',title:'Student Special', desc:'Show ID · Valid Thursdays',   price:'₹399', hot:false},
  {badge:'FAMILY COMBO',   save:'SAVE 20%',title:'Family Combo',    desc:'4+ people · Food + Games',   price:'₹1499',hot:false},
]
function DealsSection() {
  const ref = useRef(null); useReveal(ref)
  return (
    <section className="sec deals-sec" id="deals" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">ROYAL DEALS.</div>
        <h2 className="sec-h reveal">THE KING'S <span className="g">OFFERS.</span></h2>
        <div className="deals-grid">
          {deals.map(({badge,save,title,desc,price,hot},i)=>(
            <div key={title} className={`deal-card reveal${hot?' deal-hot':''}`} style={{transitionDelay:`${i*.07}s`}}>
              <div className="deal-top">
                <span className={`deal-badge${hot?' deal-badge-gold':''}`}>{badge}</span>
                <span className={`deal-save${hot?' deal-save-gold':''}`}>{save}</span>
              </div>
              <h3>{title}</h3><p>{desc}</p>
              <div className="deal-ft">
                <span className="deal-price">From <strong>{price}</strong></span>
                <button className="btn-gold" style={{padding:'7px 14px',fontSize:'.72rem'}}>GRAB DEAL {Ico.arrow}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   MY BOOKINGS (shown only when logged in)
──────────────────────────────────────────────── */
function MyBookingsSection() {
  const { user } = useAuth()
  const ref = useRef(null); useReveal(ref)
  // Re-read every time section mounts/renders so new bookings show immediately
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('bt_my_bookings') || '[]'))
  }, [])

  if (!user) return null

  return (
    <section className="sec mybk-sec" id="my-bookings" ref={ref}>
      <div className="wrap">
        <div className="sec-label reveal">MY ACCOUNT</div>
        <h2 className="sec-h reveal">YOUR <span className="g">BOOKINGS.</span></h2>

        {bookings.length === 0 ? (
          <div className="mybk-empty reveal">
            <span>📅</span>
            <p>No bookings yet.</p>
            <p className="mybk-sub">Book a cricket slot, gaming session, or celebration to get started.</p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginTop:16}}>
              <button className="btn-gold" onClick={() => scrollTo('#cricket')}>BOOK CRICKET {Ico.arrow}</button>
              <button className="btn-ghost" onClick={() => scrollTo('#games')}>BOOK GAMING {Ico.arrow}</button>
            </div>
          </div>
        ) : (
          <div className="mybk-grid reveal">
            {bookings.map((b, i) => (
              <div key={i} className="mybk-card">
                <div className="mybk-icon">{b.type === 'cricket' ? '🏏' : b.type === 'gaming' ? '🎮' : '📅'}</div>
                <div className="mybk-info">
                  <h3>{b.title}</h3>
                  <p>{b.date} · {b.time}</p>
                  <p>{b.players} players · {b.duration}</p>
                </div>
                <span className="mybk-status" style={{color:b.status==='confirmed'?'#2ecc71':'#f1c40f'}}>
                  {b.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────── */
function FooterSection() {
  return (
    <footer className="footer" id="about">
      <div className="wrap ft-grid">
        <div className="ft-brand">
          <svg viewBox="0 0 40 24" fill="none" width="32" height="19" style={{marginBottom:4}}>
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <span className="ft-name">BEAVERTOWN</span>
          <span className="ft-eat">EAT · PLAY · HANGOUT</span>
          <p className="ft-desc">Food, games, cricket, celebrations and good times — all under one roof.</p>
          <div className="ft-social">
            {['📸','👍','▶️'].map((s,i)=>(
              <a key={i} href="#" className="ft-soc" aria-label="social">{s}</a>
            ))}
          </div>
        </div>

        <div className="ft-col">
          <h5>Quick Links</h5>
          {[['Home','#hero'],['Food Street','#food'],['Game District','#games'],['Box Cricket','#cricket'],['Events','#events'],['Royal Deals','#deals']].map(([l,h])=>(
            <a key={l} href={h} onClick={e=>{e.preventDefault();scrollTo(h)}}>{l}</a>
          ))}
        </div>

        <div className="ft-col">
          <h5>Contact Us</h5>
          <p>📍 Beavertown, The King's Place<br/>Entertainment City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@beavertown.in</p>
          <p>🕐 Open Daily · 10 AM – 11 PM</p>
        </div>

        <div className="ft-col">
          <h5>Stay Updated</h5>
          <p style={{color:'rgba(255,255,255,.5)',fontSize:'.84rem',marginBottom:12}}>Get events, deals & updates.</p>
          <form onSubmit={e=>e.preventDefault()} style={{display:'flex',flexDirection:'column',gap:8}}>
            <input type="email" placeholder="Your email address" className="fi" required/>
            <button type="submit" className="btn-gold" style={{justifyContent:'center'}}>JOIN THE KINGDOM →</button>
          </form>
        </div>
      </div>

      <div className="ft-bottom">
        <span>© 2025 Beavertown. All rights reserved.</span>
        <div className="ft-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
