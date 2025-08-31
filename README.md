# supacrawler-js

Typed TypeScript/JavaScript SDK for Supacrawler API.

## Install

- From npm:
```bash
npm install @supacrawler/js
# or
yarn add @supacrawler/js
# or
pnpm add @supacrawler/js
# or
bun add @supacrawler/js
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
import { SupacrawlerClient } from '@supacrawler/js'

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

// Wait and fetch a fresh signed URL (recommended)
const signed = await client.waitForScreenshot(sJob.job_id)
console.log('screenshot:', signed.screenshot)

// Watch create/pause/resume/check/delete
const watch = await client.watchCreate({
  url: 'https://example.com/pricing',
  frequency: 'daily',
  notify_email: 'you@example.com',
  notification_preference: 'changes_only', // or 'all_runs'
})
await client.watchPause(watch.watch_id)
await client.watchResume(watch.watch_id)
await client.watchCheck(watch.watch_id)
await client.watchDelete(watch.watch_id)
```

## API coverage
- GET `/v1/scrape` (all params)
- POST `/v1/crawl`, GET `/v1/crawl/{id}`
- POST `/v1/screenshots`
- POST `/v1/watch`, GET `/v1/watch`, GET `/v1/watch/{id}`, DELETE `/v1/watch/{id}`, PATCH `/v1/watch/{id}/pause`, PATCH `/v1/watch/{id}/resume`, POST `/v1/watch/{id}/check`

## Development

### Environment Variables
- `SUPACRAWLER_API_KEY` - Your API key for production usage
- `SUPACRAWLER_BASE_URL` - Base URL (defaults to production API)

### Local Testing
See [TESTING.md](./TESTING.md) for comprehensive testing guide including:
- Package-based testing with real imports
- Local development setup
- Running individual test suites
- Examples verification

### Quick Test
```bash
# Build and test the package locally
bun run build && npm pack
cd test && bun install ../supacrawler-js-*.tgz
bun run all_package_tests.ts
```

### Examples
```bash
# Run examples (after building and installing package)
cd examples && bun install
node screenshots.js  # Screenshot examples
node scrape.js       # Scrape examples  
node jobs.js         # Crawl examples
node watch.js        # Watch examples
```

### Pre-commit Hooks
Install pre-commit hooks to ensure code quality:
```bash
pip install pre-commit
pre-commit install
```

This will run TypeScript compilation checks and comprehensive package tests before each commit.