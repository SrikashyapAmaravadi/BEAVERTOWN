/**
 * Beavertown — Image Downloader
 * Run: node download-images.js
 * Downloads free Unsplash images into public/images/
 */

import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'public', 'images')

// Curated Unsplash images — dark, cinematic, matching Beavertown vibe
const images = [
  // Backgrounds
  { file: 'hero-bg.jpg',        url: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=1920&q=85&fit=crop' },
  { file: 'cricket-bg.jpg',     url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=85&fit=crop' },
  { file: 'gaming-bg.jpg',      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=85&fit=crop' },
  { file: 'hangout-bg.jpg',     url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=85&fit=crop' },

  // Experience cards
  { file: 'exp-food.jpg',       url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop' },
  { file: 'exp-games.jpg',      url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80&fit=crop' },
  { file: 'exp-cricket.jpg',    url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80&fit=crop' },
  { file: 'exp-celeb.jpg',      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80&fit=crop' },
  { file: 'exp-hangout.jpg',    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&fit=crop' },

  // Food stalls
  { file: 'stall-01.jpg',       url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop' },
  { file: 'stall-02.jpg',       url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&fit=crop' },
  { file: 'stall-03.jpg',       url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&fit=crop' },
  { file: 'stall-04.jpg',       url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80&fit=crop' },
  { file: 'stall-05.jpg',       url: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80&fit=crop' },
  { file: 'stall-06.jpg',       url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&fit=crop' },
  { file: 'stall-07.jpg',       url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80&fit=crop' },
  { file: 'stall-08.jpg',       url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&fit=crop' },
  { file: 'stall-09.jpg',       url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&fit=crop' },

  // Games
  { file: 'game-ps5.jpg',       url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80&fit=crop' },
  { file: 'game-racing.jpg',    url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80&fit=crop' },
  { file: 'game-fifa.jpg',      url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80&fit=crop' },
  { file: 'game-multi.jpg',     url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80&fit=crop' },
  { file: 'game-arcade.jpg',    url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&q=80&fit=crop' },

  // Celebrations
  { file: 'celeb-birthday.jpg', url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80&fit=crop' },
  { file: 'celeb-corporate.jpg',url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&fit=crop' },
  { file: 'celeb-team.jpg',     url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop' },
  { file: 'celeb-private.jpg',  url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80&fit=crop' },
  { file: 'celeb-special.jpg',  url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&fit=crop' },

  // Events
  { file: 'event-gaming.jpg',   url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80&fit=crop' },
  { file: 'event-cricket.jpg',  url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80&fit=crop' },
  { file: 'event-student.jpg',  url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop' },
  { file: 'event-food.jpg',     url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop' },
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { console.log(`  ✓ exists  ${path.basename(dest)}`); return resolve() }
    const file = fs.createWriteStream(dest)
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close(); return get(res.headers.location)
        }
        if (res.statusCode !== 200) {
          file.close(); fs.unlink(dest, () => {})
          return reject(new Error(`HTTP ${res.statusCode} for ${u}`))
        }
        res.pipe(file)
        file.on('finish', () => { file.close(); console.log(`  ↓ saved   ${path.basename(dest)}`); resolve() })
      }).on('error', (e) => { fs.unlink(dest, () => {}); reject(e) })
    }
    get(url)
  })
}

async function run() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })
  console.log(`\nDownloading ${images.length} images to ${OUT}\n`)
  for (const { file, url } of images) {
    try {
      await download(url, path.join(OUT, file))
    } catch (e) {
      console.error(`  ✗ failed  ${file}: ${e.message}`)
    }
  }
  console.log('\n✅  Done! Refresh http://localhost:5173\n')
}

run()
