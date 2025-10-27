import { SupacrawlerClient, ScrapeResponse } from '@supacrawler/js'

async function main() {
  const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY || 'YOUR_API_KEY' })

  // Basic markdown scrape
  const basic = await client.scrape({ url: 'https://example.com', format: 'markdown' })
  console.log('Basic scrape:', basic)

  // HTML scrape with content included
  // Note: Engine scrape does not accept 'wait' or 'device'. Keep to OpenAPI fields only.
  const html = await client.scrape({ url: 'https://spa-example.com', format: 'markdown', include_html: true })
  console.log('HTML scrape:', !!(html as any))

  // Links mapping with depth and max_links
  const links = await client.scrape({ url: 'https://example.com', format: 'links', depth: 2, max_links: 100 })
  console.log('Links discovered:', (links as any).discovered)

  // Fresh content bypassing cache
  const fresh = await client.scrape({ url: 'https://news-site.com/article', format: 'markdown', fresh: true })
  console.log('Fresh scrape:', fresh)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})