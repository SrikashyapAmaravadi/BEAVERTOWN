// Run: node fix-hero.js
// Downloads a better cinematic night-venue hero image
import https from 'https'
import fs from 'fs'

const images = [
  // Cinematic outdoor restaurant/venue at night with warm lighting
  { file: 'hero-bg.jpg',       url: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1920&q=90&fit=crop&crop=center' },
  { file: 'cricket-bg.jpg',    url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=90&fit=crop' },
  { file: 'gaming-bg.jpg',     url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=90&fit=crop' },
  { file: 'hangout-bg.jpg',    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&fit=crop' },
  // Food stalls — better quality
  { file: 'stall-01.jpg',      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=85&fit=crop' },
  { file: 'stall-02.jpg',      url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=85&fit=crop' },
  { file: 'stall-06.jpg',      url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=85&fit=crop' },
  { file: 'stall-07.jpg',      url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=85&fit=crop' },
  // Games
  { file: 'game-ps5.jpg',      url: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=85&fit=crop' },
  { file: 'game-racing.jpg',   url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=85&fit=crop' },
]

const OUT = 'public/images'

function dl(url, dest, force = true) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && !force) { console.log(`skip ${dest}`); return resolve() }
    const f = fs.createWriteStream(dest)
    const go = (u) => https.get(u, res => {
      if ([301,302,307,308].includes(res.statusCode)) { f.close(); return go(res.headers.location) }
      res.pipe(f)
      f.on('finish', () => { f.close(); console.log(`✓ ${dest}`); resolve() })
    }).on('error', e => { console.error(`✗ ${dest}: ${e.message}`); resolve() })
    go(url)
  })
}

for (const { file, url } of images) {
  await dl(url, `${OUT}/${file}`, true)
}
console.log('\nDone — refresh http://localhost:5173')
