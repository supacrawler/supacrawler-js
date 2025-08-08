# supacrawler-js

Typed TypeScript/JavaScript SDK for Supacrawler API.

## Install

- From npm:
```bash
npm install supacrawler-js
# or
yarn add supacrawler-js
# or
pnpm add supacrawler-js
# or
bun add supacrawler-js
```

- From GitHub (direct):
```bash
npm install your-org/your-repo#sdk/supacrawler-js
```

- From local path (development):
```bash
npm install
npm run build
```

## Usage

```ts
import { SupacrawlerClient } from 'supacrawler-js'

const client = new SupacrawlerClient({ apiKey: process.env.SUPACRAWLER_API_KEY! })

// Scrape (markdown)
await client.scrape({ url: 'https://example.com', format: 'markdown' })

// Scrape with rendering
await client.scrape({ url: 'https://spa-example.com', format: 'html', render_js: true, wait: 3000, device: 'desktop' })

// Map links
await client.scrape({ url: 'https://example.com', format: 'links', depth: 2, max_links: 100 })

// Create crawl job and wait
const job = await client.createJob({ url: 'https://supabase.com/docs', type: 'crawl', depth: 2, link_limit: 50, format: 'markdown' })
const status = await client.waitForJob(job.job_id)

// Screenshot job
const sJob = await client.createScreenshotJob({ url: 'https://example.com', device: 'desktop', full_page: true })

// Watch create/pause/resume/check/delete
const watch = await client.watchCreate({ url: 'https://example.com/pricing', frequency: 'daily', notify_email: 'you@example.com' })
await client.watchPause(watch.watch_id)
await client.watchResume(watch.watch_id)
await client.watchCheck(watch.watch_id)
await client.watchDelete(watch.watch_id)
```

## API coverage
- GET `/v1/scrape` (all params)
- POST `/v1/jobs`, GET `/v1/jobs/{id}`
- POST `/v1/screenshots`
- POST `/v1/watch`, GET `/v1/watch`, GET `/v1/watch/{id}`, DELETE `/v1/watch/{id}`, PATCH `/v1/watch/{id}/pause`, PATCH `/v1/watch/{id}/resume`, POST `/v1/watch/{id}/check`

## Development
- Env var: `SUPACRAWLER_API_KEY`.
- Example runners: `npm run example:scrape|jobs|screenshots|watch`.