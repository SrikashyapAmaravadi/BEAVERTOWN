/**
 * BEAVERTOWN — Cloudinary Image URLs
 * Cloud: bwrxmqkz  |  Folder: beavertown
 * All images served with: q_auto (quality), f_auto (format), optimized size
 */

const CDN = (id, w = 1200) =>
  `https://res.cloudinary.com/bwrxmqkz/image/upload/q_auto,f_auto,w_${w}/beavertown/${id}.jpg`

export const IMG = {
  // ── Hero & Backgrounds ─────────────────────────────────────────────────
  heroBg:      CDN('hero-bg',     1920),
  cricketBg:   CDN('cricket-bg',  1920),
  gamingBg:    CDN('gaming-bg',   1920),
  hangoutBg:   CDN('hangout-bg',  1920),

  // ── Experience cards ───────────────────────────────────────────────────
  expFood:     CDN('exp-food',    800),
  expGames:    CDN('exp-games',   800),
  expCricket:  CDN('exp-cricket', 800),
  expCeleb:    CDN('exp-celeb',   800),
  expHangout:  CDN('exp-hangout', 800),

  // ── Food Stalls ────────────────────────────────────────────────────────
  stall01:     CDN('stall-01',    600),
  stall02:     CDN('stall-02',    600),
  stall03:     CDN('stall-03',    600),
  stall04:     CDN('stall-04',    600),
  stall05:     CDN('stall-05',    600),
  stall06:     CDN('stall-06',    600),
  stall07:     CDN('stall-07',    600),
  stall08:     CDN('stall-08',    600),
  stall09:     CDN('stall-09',    600),

  // ── Games ──────────────────────────────────────────────────────────────
  gamePs5:     CDN('game-ps5',    600),
  gameRacing:  CDN('game-racing', 600),
  gameFifa:    CDN('game-fifa',   600),
  gameMulti:   CDN('game-multi',  600),
  gameArcade:  CDN('game-arcade', 600),

  // ── Celebrations ───────────────────────────────────────────────────────
  celebBirthday:  CDN('celeb-birthday',  600),
  celebCorporate: CDN('celeb-corporate', 600),
  celebTeam:      CDN('celeb-team',      600),
  celebPrivate:   CDN('celeb-private',   600),
  celebSpecial:   CDN('celeb-special',   600),

  // ── Events ─────────────────────────────────────────────────────────────
  eventGaming:  CDN('event-gaming',  600),
  eventCricket: CDN('event-cricket', 600),
  eventStudent: CDN('event-student', 600),
  eventFood:    CDN('event-food',    600),
}
