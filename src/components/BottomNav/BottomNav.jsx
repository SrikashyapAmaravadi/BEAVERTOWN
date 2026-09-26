import './BottomNav.css'

const tabs = [
  { label: 'Home',    href: '#hero',     icon: <HomeIcon /> },
  { label: 'Food',    href: '#food',     icon: <FoodIcon /> },
  { label: 'Games',   href: '#games',    icon: <GameIcon /> },
  { label: 'Cricket', href: '#cricket',  icon: <CricketIcon /> },
  { label: 'Events',  href: '#events',   icon: <EventIcon /> },
]

export default function BottomNav({ active }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 62, behavior: 'smooth' })
  }

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      {tabs.map(({ label, href, icon }) => (
        <button
          key={label}
          className={`bn-tab${active === href ? ' active' : ''}`}
          onClick={() => scrollTo(href)}
          aria-label={label}
        >
          <span className="bn-icon">{icon}</span>
          <span className="bn-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}

function HomeIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function FoodIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> }
function GameIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="12" rx="5"/><line x1="12" y1="11" x2="12" y2="15" strokeLinecap="round"/><line x1="10" y1="13" x2="14" y2="13" strokeLinecap="round"/><circle cx="17" cy="11.5" r="1" fill="currentColor"/></svg> }
function CricketIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="19" x2="15" y2="9"/><path d="M15 9l2-4 2 2-4 2z" fill="currentColor"/><circle cx="4.5" cy="19.5" r="1.5" fill="currentColor"/></svg> }
function EventIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
