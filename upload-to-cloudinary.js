/**
 * Beavertown — Cloudinary Image Uploader
 * Uploads all images from public/images/ to Cloudinary
 * and prints the replacement URLs for the code.
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Cloudinary credentials ────────────────────────
const CLOUD_NAME = 'bwrxmqkz'
const API_KEY    = '222184512478357'
const API_SECRET = 'oWTM4UD9FsmSbM7WYNf2hg90Hnw'

const IMAGES_DIR = path.join(__dirname, 'public', 'images')
const FOLDER     = 'beavertown'

// ── SHA-1 for signing (Node built-in crypto) ─────
import crypto from 'crypto'

function sign(params) {
  const sorted = Object.keys(params).sort()
    .map(k => `${k}=${params[k]}`).join('&')
  return crypto.createHash('sha1').update(sorted + API_SECRET).digest('hex')
}

function uploadFile(filePath, publicId) {
  return new Promise((resolve, reject) => {
    const fileData   = fs.readFileSync(filePath)
    const base64Data = fileData.toString('base64')
    const mimeType   = 'image/jpeg'
    const dataUri    = `data:${mimeType};base64,${base64Data}`

    const timestamp  = Math.floor(Date.now() / 1000)
    const params     = { folder: FOLDER, public_id: publicId, timestamp }
    const signature  = sign(params)

    const body = new URLSearchParams({
      file:       dataUri,
      api_key:    API_KEY,
      timestamp:  String(timestamp),
      folder:     FOLDER,
      public_id:  publicId,
      signature,
    }).toString()

    const options = {
      hostname: 'api.cloudinary.com',
      path:     `/v1_1/${CLOUD_NAME}/image/upload`,
      method:   'POST',
      headers: {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.secure_url) {
            console.log(`✓ ${publicId}`)
            resolve({ publicId, url: json.secure_url })
          } else {
            console.error(`✗ ${publicId}: ${json.error?.message || data}`)
            resolve({ publicId, url: null })
          }
        } catch (e) { reject(e) }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function run() {
  const files = fs.readdirSync(IMAGES_DIR).filter(f =>
    ['.jpg','.jpeg','.png','.webp'].includes(path.extname(f).toLowerCase())
  )

  if (files.length === 0) {
    console.log('No images found in public/images/')
    return
  }

  console.log(`\nUploading ${files.length} images to Cloudinary (${CLOUD_NAME})...\n`)
  const results = []

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file)
    const publicId = path.parse(file).name  // filename without extension
    const result   = await uploadFile(filePath, publicId)
    results.push(result)
  }

  // Print results as JS object for easy copy-paste
  console.log('\n\n✅ Upload complete! Copy these URLs into your code:\n')
  console.log('export const CDN = {')
  results.forEach(({ publicId, url }) => {
    if (url) {
      // Optimize: add quality auto + format auto transformation
      const optimizedUrl = url.replace('/upload/', '/upload/q_auto,f_auto,w_1200/')
      console.log(`  '${publicId}': '${optimizedUrl}',`)
    }
  })
  console.log('}')
}

run().catch(console.error)
