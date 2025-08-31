// Engine OpenAPI models (generated)
import type { ScrapeResponse } from './gen/models/ScrapeResponse'
import type { CrawlCreateRequest } from './gen/models/CrawlCreateRequest'
import type { CrawlCreateResponse } from './gen/models/CrawlCreateResponse'
import type { CrawlStatusResponse } from './gen/models/CrawlStatusResponse'
import type { ScreenshotCreateRequest } from './gen/models/ScreenshotCreateRequest'
import type { ScreenshotJobResponse } from './gen/models/ScreenshotJobResponse'
import type { ScreenshotGetResponse } from './gen/models/ScreenshotGetResponse'
import { SupaCrawlerClient as GeneratedClient } from './gen/SupaCrawlerClient'
import { OpenAPI } from './gen/core/OpenAPI'

// Backend watch types (custom)
import type {
  WatchCreateRequest,
  WatchCreateResponse,
  WatchGetResponse,
  WatchListResponse,
  WatchDeleteResponse,
  WatchActionResponse,
} from './types'

export interface ClientOptions {
  apiKey: string
  baseUrl?: string // e.g. https://api.supacrawler.com/api
  fetchFn?: typeof fetch
  timeoutMs?: number
}

export class SupacrawlerError extends Error {
  status?: number
  body?: unknown
  constructor(message: string, status?: number, body?: unknown) {
    super(message)
    this.status = status
    this.body = body
  }
}

export class SupacrawlerClient {
  private apiKey: string
  private baseUrl: string
  private fetchFn: typeof fetch
  private timeoutMs: number
  private engine: GeneratedClient

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey
    // Use same convention as Python SDK: base points to /api; engine adds /v1
    const defaultBase = 'https://api.supacrawler.com/api'
    this.baseUrl = (options.baseUrl ?? defaultBase).replace(/\/$/, '')
    this.fetchFn = options.fetchFn ?? fetch
    this.timeoutMs = options.timeoutMs ?? 30000

    // Configure generated engine client
    OpenAPI.BASE = this.baseUrl
    OpenAPI.TOKEN = this.apiKey
    // Headers can be further customized if needed via OpenAPI.HEADERS
    this.engine = new GeneratedClient({ BASE: this.baseUrl, TOKEN: this.apiKey })
  }

  private headers(): HeadersInit {
    return { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' }
  }

  private async request<T>(path: string, init?: RequestInit & { timeoutMs?: number }): Promise<T> {
    const controller = new AbortController()
    const timeout = init?.timeoutMs ?? this.timeoutMs
    const id = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await this.fetchFn(`${this.baseUrl}${path}`, { ...init, signal: controller.signal })
      return await this.handle<T>(res)
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        throw new SupacrawlerError(`Request timed out after ${timeout}ms`)
      }
      throw e
    } finally {
      clearTimeout(id)
    }
  }

  private async handle<T>(res: Response): Promise<T> {
    if (!res.ok) {
      let body: unknown
      try { body = await res.json() } catch { body = await res.text() }
      throw new SupacrawlerError(`HTTP ${res.status}`, res.status, body)
    }
    return res.json() as Promise<T>
  }

  // ------------- Scrape -------------
  async scrape(params: { url: string; format?: 'markdown' | 'links'; depth?: number; max_links?: number; render_js?: boolean; include_html?: boolean; fresh?: boolean; }): Promise<ScrapeResponse> {
    const { url, format, depth, max_links, render_js, include_html, fresh } = params
    return this.engine.scrape.getV1Scrape(url, format, depth, max_links, render_js, include_html, fresh)
  }

  // ------------- Jobs (crawl + status) -------------
  async createCrawlJob(req: CrawlCreateRequest): Promise<CrawlCreateResponse> {
    return this.engine.jobs.postV1Crawl(req)
  }
  // Back-compat alias
  async createJob(req: CrawlCreateRequest): Promise<CrawlCreateResponse> {
    return this.createCrawlJob(req)
  }

  async getCrawl(jobId: string): Promise<CrawlStatusResponse> {
    return this.engine.jobs.getV1Crawl(jobId)
  }
  // Back-compat alias
  async getJob(jobId: string): Promise<CrawlStatusResponse> { return this.getCrawl(jobId) }

  async waitForCrawl(jobId: string, opts: { intervalMs?: number; timeoutMs?: number } = {}): Promise<CrawlStatusResponse> {
    const interval = opts.intervalMs ?? 3000
    const timeout = opts.timeoutMs ?? 300000
    const start = Date.now()
    while (true) {
      const status = await this.getCrawl(jobId)
      const s = (status.status as any)?.toString?.().toLowerCase?.() ?? status.status
      if (s === 'completed' || s === 'failed') return status
      if (Date.now() - start > timeout) throw new SupacrawlerError(`Timeout waiting for job ${jobId}`)
      await new Promise(r => setTimeout(r, interval))
    }
  }
  // Back-compat alias
  async waitForJob(jobId: string, opts: { intervalMs?: number; timeoutMs?: number } = {}): Promise<CrawlStatusResponse> {
    return this.waitForCrawl(jobId, opts)
  }

  // ------------- Screenshots -------------
  async createScreenshotJob(req: ScreenshotCreateRequest): Promise<ScreenshotJobResponse> {
    return this.engine.screenshots.postV1Screenshots(req)
  }

  async getScreenshot(jobId: string): Promise<ScreenshotGetResponse> {
    return this.engine.screenshots.getV1Screenshots(jobId)
  }

  async waitForScreenshot(jobId: string, opts: { intervalMs?: number; timeoutMs?: number } = {}): Promise<ScreenshotGetResponse> {
    const interval = opts.intervalMs ?? 3000
    const timeout = opts.timeoutMs ?? 300000
    const start = Date.now()
    while (true) {
      const resp = await this.getScreenshot(jobId)
      const s = (resp.status as any)?.toString?.().toLowerCase?.()
      if (s === 'completed') return resp
      if (Date.now() - start > timeout) throw new SupacrawlerError(`Timeout waiting for screenshot ${jobId}`)
      await new Promise(r => setTimeout(r, interval))
    }
  }

  // ------------- Watch -------------
  async watchCreate(req: WatchCreateRequest): Promise<WatchCreateResponse> {
    return this.request<WatchCreateResponse>(`/v1/watch`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(req),
    })
  }

  async watchGet(watchId: string): Promise<WatchGetResponse> {
    return this.request<WatchGetResponse>(`/v1/watch/${watchId}`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchList(): Promise<WatchListResponse> {
    return this.request<WatchListResponse>(`/v1/watch`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchDelete(watchId: string): Promise<WatchDeleteResponse> {
    return this.request<WatchDeleteResponse>(`/v1/watch/${watchId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchPause(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/v1/watch/${watchId}/pause`, { method: 'PATCH', headers: this.headers() })
  }

  async watchResume(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/v1/watch/${watchId}/resume`, { method: 'PATCH', headers: this.headers() })
  }

  async watchCheck(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/v1/watch/${watchId}/check`, { method: 'POST', headers: this.headers() })
  }
}