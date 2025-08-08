import { SupacrawlerClient } from '../index'

async function main() {
  const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY || 'YOUR_API_KEY' })

  const job = await client.createJob({
    url: 'https://supabase.com/docs',
    type: 'crawl',
    format: 'markdown',
    link_limit: 50,
    depth: 2,
    include_subdomains: false,
    render_js: false,
    patterns: ['/blog/*', '/docs/*']
  })

  console.log('Job created:', job)

  const status = await client.waitForJob(job.job_id, { intervalMs: 3000, timeoutMs: 600000 })
  console.log('Final status:', status.status)
  if (status.status === 'completed' && status.data && 'crawl_data' in status.data) {
    const crawlData = (status.data as any).crawl_data
    console.log('Crawled pages:', Object.keys(crawlData).length)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})