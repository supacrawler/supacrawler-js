import { SupacrawlerClient, CrawlCreateRequest } from '@supacrawler/js'

async function main() {
  const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY || 'YOUR_API_KEY' })

  const job = await client.createCrawlJob({
    url: 'https://supabase.com/docs',
    format: CrawlCreateRequest.format.MARKDOWN,
    link_limit: 10,
    depth: 2,
    include_subdomains: false,
    render_js: false,
  })

  console.log('Job created:', job)

  const status = await client.waitForCrawl(job.job_id, { intervalMs: 3000, timeoutMs: 600000 })
  console.log('Final status:', status.status)
  const data = status.data
  if (data && data.crawl_data) {
    console.log('Crawled pages:', Object.keys(data.crawl_data).length)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})