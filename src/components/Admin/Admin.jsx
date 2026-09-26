import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Admin.css'

/* ── Seed mock data ─────────────────────────────── */
const mockBookings = [
  { id:'BK001', type:'Box Cricket', name:'Arjun Sharma',   date:'2026-09-28', time:'4:00 PM', players:8,  status:'confirmed', amount:1200 },
  { id:'BK002', type:'PS5 Gaming',  name:'Priya Nair',     date:'2026-09-28', time:'6:00 PM', players:2,  status:'pending',   amount:598  },
  { id:'BK003', type:'Box Cricket', name:'Rohit Mehta',    date:'2026-09-29', time:'10:00 AM',players:10, status:'confirmed', amount:2000 },
  { id:'BK004', type:'Table',       name:'Sneha Krishnan', date:'2026-09-29', time:'7:00 PM', players:4,  status:'pending',   amount:0    },
  { id:'BK005', type:'Racing',      name:'Dev Pillai',     date:'2026-09-30', time:'2:00 PM', players:2,  status:'cancelled', amount:398  },
  { id:'BK006', type:'Birthday',    name:'Anjali Menon',   date:'2026-10-01', time:'6:00 PM', players:20, status:'confirmed', amount:4500 },
]

const mockOrders = [
  { id:'OR001', table:12, items:['Burger Club ×2','Blue Lagoon ×1'], total:400, status:'delivered', time:'1:20 PM' },
  { id:'OR002', table:7,  items:['Pizza Spot ×1','Spicy Dhamaka ×2'], total:520, status:'preparing', time:'1:35 PM' },
  { id:'OR003', table:3,  items:['Sweet Kingdom ×3','Beverage Bar ×2'], total:660, status:'placed',   time:'1:42 PM' },
  { id:'OR004', table:15, items:['Grill House ×1','South Bites ×1'],  total:380, status:'ready',    time:'1:50 PM' },
]

const mockUsers = JSON.parse(localStorage.getItem('bt_users') || '[]')

const stats = [
  { label: 'Total Bookings', value: '128',  icon: '📅', color: '#D4A017', sub: '+12 today'   },
  { label: 'Active Orders',  value: '24',   icon: '🍽️', color: '#2ecc71', sub: '4 tables'    },
  { label: 'Revenue Today',  value: '₹18.4K', icon: '💰', color: '#3498db', sub: '+8% vs yesterday' },
  { label: 'Registered Users', value: String(mockUsers.length + 1), icon: '👥', color: '#9b59b6', sub: 'Total signups' },
]

/* ════════════════════════════════════════════════
   ADMIN ROOT
════════════════════════════════════════════════ */
export default function Admin({ onLogout }) {
  const { user } = useAuth()
  const [tab, setTab] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Dashboard',  icon: '📊' },
    { id: 'bookings',  label: 'Bookings',   icon: '📅' },
    { id: 'orders',    label: 'Food Orders',icon: '🍽️' },
    { id: 'analytics', label: 'Analytics',  icon: '📈' },
    { id: 'users',     label: 'Users',      icon: '👥' },
    { id: 'stalls',    label: 'Stalls',     icon: '🏪' },
    { id: 'events',    label: 'Events',     icon: '🎉' },
    { id: 'settings',  label: 'Settings',   icon: '⚙️' },
  ]

  return (
    <div className="admin">
      {/* ── Sidebar ── */}
      <aside className={`admin-side${sideOpen ? ' open' : ''}`}>
        <div className="as-logo">
          <svg viewBox="0 0 40 24" fill="none" width="30" height="18">
            <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
            <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
            <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
          </svg>
          <div>
            <span className="as-brand">BEAVERTOWN</span>
            <span className="as-role">Admin Portal</span>
          </div>
        </div>

        <nav className="as-nav">
          {tabs.map(t => (
            <button key={t.id} className={`as-tab${tab === t.id ? ' active' : ''}`}
              onClick={() => { setTab(t.id); setSideOpen(false) }}>
              <span className="as-tab-ico">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <button className="as-logout" onClick={onLogout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </aside>

      {/* ── Main ── */}
      <div className="admin-main">
        {/* Top bar */}
        <div className="admin-topbar">
          <button className="atb-menu" onClick={() => setSideOpen(p => !p)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <h1 className="atb-title">{tabs.find(t => t.id === tab)?.label}</h1>
          <div className="atb-right">
            <button className="atb-notif" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="notif-dot" />
            </button>
            <div className="atb-user">
              <div className="atb-avatar">{user?.name?.[0] ?? 'A'}</div>
              <div className="atb-info">
                <span>{user?.name}</span>
                <span className="atb-badge">Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'bookings'  && <BookingsTab />}
          {tab === 'orders'    && <OrdersTab />}
          {tab === 'analytics' && <AnalyticsTab />}
          {tab === 'users'     && <UsersTab />}
          {tab === 'stalls'    && <StallsTab />}
          {tab === 'events'    && <EventsTab />}
          {tab === 'settings'  && <SettingsTab user={user} />}
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {sideOpen && <div className="admin-backdrop" onClick={() => setSideOpen(false)} />}
    </div>
  )
}

/* ── DASHBOARD TAB ──────────────────────────────── */
function DashboardTab() {
  return (
    <div className="tab-content">
      {/* Stats */}
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card" style={{ '--accent': s.color }}>
            <div className="sc-top">
              <span className="sc-icon">{s.icon}</span>
              <span className="sc-value">{s.value}</span>
            </div>
            <span className="sc-label">{s.label}</span>
            <span className="sc-sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="dash-row">
        <div className="dash-panel">
          <h3 className="panel-title">Recent Bookings</h3>
          <div className="mini-table">
            {mockBookings.slice(0,4).map(b => (
              <div key={b.id} className="mt-row">
                <span className="mt-id">{b.id}</span>
                <span className="mt-name">{b.name}</span>
                <span className="mt-type">{b.type}</span>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <h3 className="panel-title">Live Orders</h3>
          <div className="mini-table">
            {mockOrders.map(o => (
              <div key={o.id} className="mt-row">
                <span className="mt-id">Table {o.table}</span>
                <span className="mt-name" style={{ flex:1 }}>{o.items[0]}{o.items.length > 1 ? ` +${o.items.length-1}` : ''}</span>
                <span className="mt-price">₹{o.total}</span>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="dash-panel" style={{ marginTop: 0 }}>
        <h3 className="panel-title">Quick Actions</h3>
        <div className="quick-grid">
          {[
            { label: 'Add Booking',   icon: '📅', color: '#D4A017' },
            { label: 'New Order',     icon: '🍽️', color: '#2ecc71' },
            { label: 'Add Event',     icon: '🎉', color: '#3498db' },
            { label: 'Update Stall',  icon: '🏪', color: '#9b59b6' },
            { label: 'View Reports',  icon: '📊', color: '#e67e22' },
            { label: 'Send Promo',    icon: '📣', color: '#e74c3c' },
          ].map(q => (
            <button key={q.label} className="quick-btn" style={{ '--qc': q.color }}>
              <span>{q.icon}</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── BOOKINGS TAB ───────────────────────────────── */
function BookingsTab() {
  const [bookings, setBookings] = useState(mockBookings)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  const filtered = bookings
    .filter(b => filter === 'all' || b.status === filter)
    .filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search))

  const updateStatus = (id, status) =>
    setBookings(p => p.map(b => b.id === id ? { ...b, status } : b))

  return (
    <div className="tab-content">
      <div className="table-toolbar">
        <div className="tt-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search bookings…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="tt-filters">
          {['all','pending','confirmed','cancelled'].map(f => (
            <button key={f} className={`tf-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="data-table">
        <div className="dt-head">
          <span>ID</span><span>Customer</span><span>Type</span>
          <span>Date</span><span>Time</span><span>Players</span>
          <span>Amount</span><span>Status</span><span>Action</span>
        </div>
        {filtered.map(b => (
          <div key={b.id} className="dt-row">
            <span className="dt-id">{b.id}</span>
            <span>{b.name}</span>
            <span>{b.type}</span>
            <span>{b.date}</span>
            <span>{b.time}</span>
            <span>{b.players}</span>
            <span className="dt-price">₹{b.amount}</span>
            <StatusBadge status={b.status} />
            <div className="dt-actions">
              {b.status === 'pending' && <>
                <button className="da-btn da-confirm" onClick={() => updateStatus(b.id,'confirmed')}>✓</button>
                <button className="da-btn da-cancel"  onClick={() => updateStatus(b.id,'cancelled')}>✗</button>
              </>}
              {b.status !== 'pending' && <span className="da-done">—</span>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="dt-empty">No bookings found.</div>}
      </div>
    </div>
  )
}

/* ── ORDERS TAB ─────────────────────────────────── */
function OrdersTab() {
  const [orders, setOrders] = useState(mockOrders)
  const next = { placed:'preparing', preparing:'ready', ready:'delivered' }
  const advance = id => setOrders(p => p.map(o => o.id===id && next[o.status] ? {...o,status:next[o.status]} : o))

  return (
    <div className="tab-content">
      <div className="orders-grid">
        {orders.map(o => (
          <div key={o.id} className="order-card">
            <div className="oc-head">
              <span className="oc-table">Table {o.table}</span>
              <StatusBadge status={o.status} />
            </div>
            <div className="oc-items">
              {o.items.map((it,i) => <span key={i} className="oc-item">{it}</span>)}
            </div>
            <div className="oc-foot">
              <span className="oc-total">₹{o.total}</span>
              <span className="oc-time">{o.time}</span>
            </div>
            {o.status !== 'delivered' && (
              <button className="oc-advance" onClick={() => advance(o.id)}>
                Mark as {next[o.status]} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── USERS TAB ──────────────────────────────────── */
function UsersTab() {
  const users = [
    { name:'Admin', email:'admin@beavertown.in', role:'admin',   joined:'System',       bookings:0 },
    ...mockUsers.map((u,i) => ({ ...u, role:'user', joined:`Sep ${20+i}, 2026`, bookings: Math.floor(Math.random()*5) }))
  ]
  return (
    <div className="tab-content">
      <div className="data-table">
        <div className="dt-head" style={{ gridTemplateColumns:'2fr 2fr 1fr 1fr 1fr' }}>
          <span>Name</span><span>Email</span><span>Role</span><span>Joined</span><span>Bookings</span>
        </div>
        {users.map((u,i) => (
          <div key={i} className="dt-row" style={{ gridTemplateColumns:'2fr 2fr 1fr 1fr 1fr' }}>
            <span>{u.name}</span>
            <span style={{color:'var(--text-muted)',fontSize:'.82rem'}}>{u.email}</span>
            <StatusBadge status={u.role} />
            <span style={{fontSize:'.8rem',color:'var(--text-muted)'}}>{u.joined}</span>
            <span>{u.bookings}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── STALLS TAB ─────────────────────────────────── */
const stallList = [
  {id:1,name:'The Burger Club',  category:'Fast Food',   status:'open',   orders:42, revenue:'₹5.8K'},
  {id:2,name:'Spicy Dhamaka',    category:'Chinese',     status:'open',   orders:38, revenue:'₹4.2K'},
  {id:3,name:'The Pizza Spot',   category:'Italian',     status:'open',   orders:29, revenue:'₹5.1K'},
  {id:4,name:'South Bites',      category:'South Indian',status:'open',   orders:22, revenue:'₹2.9K'},
  {id:5,name:'Chinese Wok',      category:'Chinese',     status:'closed', orders:0,  revenue:'₹0'},
  {id:6,name:'The Grill House',  category:'BBQ',         status:'open',   orders:31, revenue:'₹4.7K'},
  {id:7,name:'Sweet Kingdom',    category:'Desserts',    status:'open',   orders:18, revenue:'₹1.8K'},
  {id:8,name:'Street Bites',     category:'Street Food', status:'open',   orders:26, revenue:'₹2.1K'},
  {id:9,name:'Beverage Bar',     category:'Drinks',      status:'open',   orders:55, revenue:'₹2.2K'},
]
function StallsTab() {
  const [stalls, setStalls] = useState(stallList)
  const toggle = id => setStalls(p => p.map(s => s.id===id ? {...s, status: s.status==='open'?'closed':'open'} : s))
  return (
    <div className="tab-content">
      <div className="stalls-admin-grid">
        {stalls.map(s => (
          <div key={s.id} className="sa-card">
            <div className="sa-head">
              <span className="sa-num">#{String(s.id).padStart(2,'0')}</span>
              <StatusBadge status={s.status} />
            </div>
            <h3 className="sa-name">{s.name}</h3>
            <span className="sa-cat">{s.category}</span>
            <div className="sa-stats">
              <div><span>{s.orders}</span><small>Orders</small></div>
              <div><span>{s.revenue}</span><small>Revenue</small></div>
            </div>
            <button className={`sa-toggle${s.status==='open'?' open':''}`} onClick={() => toggle(s.id)}>
              {s.status === 'open' ? 'Close Stall' : 'Open Stall'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── EVENTS TAB ─────────────────────────────────── */
const eventList = [
  {id:1,name:'Weekend Game Night',   date:'Every Fri & Sat', registrations:42, status:'active' },
  {id:2,name:'Box Cricket Challenge',date:'Oct 5, 2026',     registrations:18, status:'active' },
  {id:3,name:'Student Night',        date:'Every Thursday',  registrations:67, status:'active' },
  {id:4,name:'Food Festival',        date:'Oct 12, 2026',    registrations:23, status:'draft'  },
]
function EventsTab() {
  const [events, setEvents] = useState(eventList)
  const toggle = id => setEvents(p => p.map(e => e.id===id ? {...e, status:e.status==='active'?'draft':'active'} : e))
  return (
    <div className="tab-content">
      <div className="data-table">
        <div className="dt-head" style={{gridTemplateColumns:'2fr 1.5fr 1fr 1fr 1fr'}}>
          <span>Event</span><span>Date</span><span>Registrations</span><span>Status</span><span>Action</span>
        </div>
        {events.map(e => (
          <div key={e.id} className="dt-row" style={{gridTemplateColumns:'2fr 1.5fr 1fr 1fr 1fr'}}>
            <span>{e.name}</span>
            <span style={{color:'var(--text-muted)',fontSize:'.82rem'}}>{e.date}</span>
            <span>{e.registrations}</span>
            <StatusBadge status={e.status} />
            <button className="da-btn da-confirm" onClick={() => toggle(e.id)}>Toggle</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── SETTINGS TAB ───────────────────────────────── */
function SettingsTab({ user }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="tab-content">
      <div className="settings-grid">
        <div className="set-card">
          <h3>Profile</h3>
          <div className="set-avatar">{user?.name?.[0] ?? 'A'}</div>
          <div className="set-field"><label>Name</label><input defaultValue={user?.name} className="set-input"/></div>
          <div className="set-field"><label>Email</label><input defaultValue={user?.email} className="set-input"/></div>
          <button className="set-save" onClick={() => { setSaved(true); setTimeout(()=>setSaved(false),2000) }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="set-card">
          <h3>Venue Settings</h3>
          <div className="set-field"><label>Venue Name</label><input defaultValue="Beavertown" className="set-input"/></div>
          <div className="set-field"><label>Opening Time</label><input defaultValue="10:00 AM" className="set-input"/></div>
          <div className="set-field"><label>Closing Time</label><input defaultValue="11:00 PM" className="set-input"/></div>
          <div className="set-field"><label>Contact Phone</label><input defaultValue="+91 98765 43210" className="set-input"/></div>
          <button className="set-save">Save Venue</button>
        </div>

        <div className="set-card">
          <h3>Change Password</h3>
          <div className="set-field"><label>Current Password</label><input type="password" placeholder="••••••••" className="set-input"/></div>
          <div className="set-field"><label>New Password</label><input type="password" placeholder="Min. 6 chars" className="set-input"/></div>
          <div className="set-field"><label>Confirm New</label><input type="password" placeholder="••••••••" className="set-input"/></div>
          <button className="set-save">Update Password</button>
        </div>
      </div>
    </div>
  )
}

/* ── STATUS BADGE ───────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    confirmed: { bg:'rgba(46,204,113,.15)', color:'#2ecc71', label:'Confirmed' },
    pending:   { bg:'rgba(241,196,15,.15)', color:'#f1c40f', label:'Pending'   },
    cancelled: { bg:'rgba(231,76,60,.15)',  color:'#e74c3c', label:'Cancelled' },
    delivered: { bg:'rgba(46,204,113,.15)', color:'#2ecc71', label:'Delivered' },
    preparing: { bg:'rgba(52,152,219,.15)', color:'#3498db', label:'Preparing' },
    placed:    { bg:'rgba(241,196,15,.15)', color:'#f1c40f', label:'Placed'    },
    ready:     { bg:'rgba(212,160,23,.18)', color:'#D4A017', label:'Ready'     },
    open:      { bg:'rgba(46,204,113,.15)', color:'#2ecc71', label:'Open'      },
    closed:    { bg:'rgba(231,76,60,.15)',  color:'#e74c3c', label:'Closed'    },
    active:    { bg:'rgba(46,204,113,.15)', color:'#2ecc71', label:'Active'    },
    draft:     { bg:'rgba(255,255,255,.06)',color:'rgba(255,255,255,.45)', label:'Draft' },
    admin:     { bg:'rgba(212,160,23,.18)', color:'#D4A017', label:'Admin'     },
    user:      { bg:'rgba(52,152,219,.15)', color:'#3498db', label:'User'      },
  }
  const s = map[status] ?? { bg:'rgba(255,255,255,.06)', color:'#aaa', label: status }
  return (
    <span className="status-badge" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

/* ── ANALYTICS TAB ──────────────────────────────── */
const weeklyRevenue  = [12400, 15800, 9200,  18400, 21000, 16500, 18400]
const weeklyBookings = [18,    24,    15,    31,    28,    22,    29   ]
const days           = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const stallRevenue = [
  { name:'Burger Club',  pct:22, rev:'₹5.8K', color:'#D4A017'  },
  { name:'Grill House',  pct:18, rev:'₹4.7K', color:'#e67e22'  },
  { name:'Pizza Spot',   pct:19, rev:'₹5.1K', color:'#e74c3c'  },
  { name:'Spicy Dhamaka',pct:16, rev:'₹4.2K', color:'#9b59b6'  },
  { name:'Beverage Bar', pct:8,  rev:'₹2.2K', color:'#3498db'  },
  { name:'Others',       pct:17, rev:'₹4.6K', color:'rgba(255,255,255,.2)' },
]

function AnalyticsTab() {
  const maxRev = Math.max(...weeklyRevenue)
  const maxBk  = Math.max(...weeklyBookings)

  return (
    <div className="tab-content">
      {/* KPI row */}
      <div className="stats-grid">
        {[
          { label:'This Week Revenue', value:'₹1.11L', icon:'💰', color:'#D4A017', sub:'+14% vs last week' },
          { label:'Total Bookings',    value:'128',    icon:'📅', color:'#2ecc71', sub:'Week total'        },
          { label:'Avg. Order Value',  value:'₹490',   icon:'🛒', color:'#3498db', sub:'Per table'         },
          { label:'Court Utilisation', value:'74%',    icon:'🏏', color:'#9b59b6', sub:'Box cricket'       },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{'--accent':s.color}}>
            <div className="sc-top"><span className="sc-icon">{s.icon}</span><span className="sc-value">{s.value}</span></div>
            <span className="sc-label">{s.label}</span>
            <span className="sc-sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Revenue bar chart */}
      <div className="dash-panel an-chart-panel">
        <h3 className="panel-title">Weekly Revenue (₹)</h3>
        <div className="bar-chart">
          {weeklyRevenue.map((v, i) => (
            <div key={days[i]} className="bar-col">
              <span className="bar-val">₹{(v/1000).toFixed(1)}K</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ height: `${(v/maxRev)*100}%`, background:'var(--gold)' }} />
              </div>
              <span className="bar-day">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings chart + stall breakdown */}
      <div className="dash-row">
        <div className="dash-panel">
          <h3 className="panel-title">Weekly Bookings</h3>
          <div className="bar-chart" style={{height:160}}>
            {weeklyBookings.map((v, i) => (
              <div key={days[i]} className="bar-col">
                <span className="bar-val">{v}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ height:`${(v/maxBk)*100}%`, background:'#3498db' }} />
                </div>
                <span className="bar-day">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-panel">
          <h3 className="panel-title">Revenue by Stall</h3>
          <div className="stall-bars">
            {stallRevenue.map(s => (
              <div key={s.name} className="sb-row">
                <span className="sb-name">{s.name}</span>
                <div className="sb-track">
                  <div className="sb-fill" style={{ width:`${s.pct}%`, background: s.color }} />
                </div>
                <span className="sb-rev">{s.rev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking type breakdown */}
      <div className="dash-panel">
        <h3 className="panel-title">Bookings by Type</h3>
        <div className="type-grid">
          {[
            { type:'Box Cricket', count:42, pct:33, color:'#D4A017'  },
            { type:'Gaming',      count:38, pct:30, color:'#9b59b6'  },
            { type:'Table',       count:28, pct:22, color:'#3498db'  },
            { type:'Events',      count:12, pct:9,  color:'#2ecc71'  },
            { type:'Other',       count:8,  pct:6,  color:'#e67e22'  },
          ].map(t => (
            <div key={t.type} className="type-card" style={{'--tc': t.color}}>
              <div className="tc-ring">
                <svg viewBox="0 0 36 36" width="64" height="64">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="3.5"/>
                  <circle cx="18" cy="18" r="14" fill="none" stroke={t.color} strokeWidth="3.5"
                    strokeDasharray={`${t.pct * 0.879} 87.9`}
                    strokeDashoffset="22" strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <span className="tc-pct">{t.pct}%</span>
              </div>
              <span className="tc-type">{t.type}</span>
              <span className="tc-count">{t.count} bookings</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
