import './Footer.css'

const quickLinks = ['Home','Food Street','Game District','Box Cricket','Events','Royal Deals','Celebrations']
const linkHrefs  = ['#hero','#food','#games','#cricket','#events','#deals','#celebrations']

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="about">
      <div className="footer-top">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="logo-wrap" style={{ marginBottom: 14 }}>
              <svg viewBox="0 0 40 24" fill="none" style={{ width: 32, height: 19, marginBottom: 2, filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.45))' }}>
                <path d="M2 22L8 6L20 14L32 6L38 22H2Z" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="20" cy="13" r="2.5" fill="#c0392b"/>
                <circle cx="8" cy="5.5" r="2" fill="#D4A017"/>
                <circle cx="32" cy="5.5" r="2" fill="#D4A017"/>
              </svg>
              <div className="logo-text">
                <span className="logo-brand">BEAVERTOWN</span>
                <span className="logo-tagline">THE KING'S PLACE</span>
              </div>
            </div>
            <p className="footer-eat">EAT · PLAY · HANGOUT</p>
            <p className="footer-desc">Food, games, cricket, celebrations and good times — all under one roof.</p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Instagram"><InstaIcon /></a>
              <a href="#" className="social-btn" aria-label="Facebook"><FbIcon /></a>
              <a href="#" className="social-btn" aria-label="YouTube"><YtIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {quickLinks.map((l, i) => (
                <li key={l}>
                  <a href={linkHrefs[i]} onClick={e => { e.preventDefault(); scrollTo(linkHrefs[i]) }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact Us</h5>
            <ul className="footer-contact">
              <li>
                <PinIcon />
                <span>Beavertown, The King's Place<br />Entertainment City</span>
              </li>
              <li>
                <PhoneIcon />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <MailIcon />
                <span>hello@beavertown.in</span>
              </li>
              <li>
                <ClockIcon />
                <span>Open Daily · 10 AM – 11 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h5>Stay Updated</h5>
            <p className="footer-nl-desc">Get event updates, deals and happenings at Beavertown.</p>
            <form className="footer-nl" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="form-input nl-input" required />
              <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
                JOIN THE KINGDOM →
              </button>
            </form>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 Beavertown. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function InstaIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> }
function FbIcon()    { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> }
function YtIcon()    { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> }
function PinIcon()   { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function PhoneIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> }
function MailIcon()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function ClockIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
