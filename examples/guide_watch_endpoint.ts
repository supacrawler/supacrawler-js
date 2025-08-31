import { SupacrawlerClient } from '@supacrawler/js'

async function main() {
  const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY || 'YOUR_API_KEY' })

  // Create watch
  const created = await client.watchCreate({
    url: 'https://example.com/pricing',
    frequency: 'daily',
    notify_email: 'alerts@yourcompany.com',
    notification_preference: 'changes_only',
    selector: '#pricing-table',
    include_html: true,
    include_image: true,
    full_page: true,
    quality: 85,
  })
  console.log('Watch created:', created)

  // Get details
  const details = await client.watchGet(created.watch_id)
  console.log('Watch details:', details)

  // List watches
  const list = await client.watchList()
  console.log('Total watches:', list.total)

  // Pause and resume
  await client.watchPause(created.watch_id)
  await client.watchResume(created.watch_id)

  // Trigger manual check
  await client.watchCheck(created.watch_id)

  // Delete watch
  await client.watchDelete(created.watch_id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})