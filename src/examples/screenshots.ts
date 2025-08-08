import { SupacrawlerClient } from '../index'

async function main() {
  const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY || 'YOUR_API_KEY' })

  const job = await client.createScreenshotJob({
    url: 'https://example.com',
    device: 'desktop',
    full_page: true,
    format: 'png',
    quality: 90,
    width: 1920,
    height: 1080,
    device_scale: 1.0,
    dark_mode: false,
    reduced_motion: false,
    high_contrast: false,
    block_ads: true,
    hide_selectors: ['.popup', '.banner']
  })

  console.log('Screenshot job created:', job)

  const status = await client.waitForJob(job.job_id, { intervalMs: 3000, timeoutMs: 300000 })
  console.log('Screenshot status:', status.status)
  if (status.status === 'completed' && status.data && 'screenshot' in status.data) {
    console.log('Screenshot URL:', (status.data as any).screenshot)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})