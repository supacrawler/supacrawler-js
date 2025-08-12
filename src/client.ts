import type {
  ScrapeParams,
  ScrapeResponse,
  JobCreateRequest,
  JobCreateResponse,
  JobStatusResponse,
  ScreenshotRequest,
  ScreenshotCreateResponse,
  ScreenshotGetResponse,
  WatchCreateRequest,
  WatchCreateResponse,
  WatchGetResponse,
  WatchListResponse,
  WatchDeleteResponse,
  WatchActionResponse,
} from './types'

export interface ClientOptions {
  apiKey: string
  baseUrl?: string
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

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey
    // Allow passing engine root (e.g., http://localhost:8081/v1) or hosted API root
    const defaultBase = 'https://api.supacrawler.com/api/v1'
    this.baseUrl = (options.baseUrl ?? defaultBase).replace(/\/$/, '')
    this.fetchFn = options.fetchFn ?? fetch
    this.timeoutMs = options.timeoutMs ?? 30000
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
  async scrape(params: ScrapeParams): Promise<ScrapeResponse> {
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) qs.append(k, String(v))
    })
    return this.request<ScrapeResponse>(`/scrape?${qs.toString()}`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  // ------------- Jobs (crawl + status) -------------
  async createJob(req: JobCreateRequest): Promise<JobCreateResponse> {
    return this.request<JobCreateResponse>(`/jobs`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(req),
    })
  }

  async getJob(jobId: string): Promise<JobStatusResponse> {
    return this.request<JobStatusResponse>(`/jobs/${jobId}`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async waitForJob(jobId: string, opts: { intervalMs?: number; timeoutMs?: number } = {}): Promise<JobStatusResponse> {
    const interval = opts.intervalMs ?? 3000
    const timeout = opts.timeoutMs ?? 300000
    const start = Date.now()
    while (true) {
      const status = await this.getJob(jobId)
      if (status.status === 'completed' || status.status === 'failed') return status
      if (Date.now() - start > timeout) throw new SupacrawlerError(`Timeout waiting for job ${jobId}`)
      await new Promise(r => setTimeout(r, interval))
    }
  }

  // ------------- Screenshots -------------
  async createScreenshotJob(req: ScreenshotRequest): Promise<ScreenshotCreateResponse> {
    return this.request<ScreenshotCreateResponse>(`/screenshots`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(req),
    })
  }

  async getScreenshot(jobId: string): Promise<ScreenshotGetResponse> {
    const qs = new URLSearchParams({ job_id: jobId })
    return this.request<ScreenshotGetResponse>(`/screenshots?${qs.toString()}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    })
  }

  async waitForScreenshot(jobId: string, opts: { intervalMs?: number; timeoutMs?: number } = {}): Promise<ScreenshotGetResponse> {
    const status = await this.waitForJob(jobId, opts)
    if (status.status !== 'completed') throw new SupacrawlerError(`Job ${jobId} did not complete`)
    return this.getScreenshot(jobId)
  }

  // ------------- Watch -------------
  async watchCreate(req: WatchCreateRequest): Promise<WatchCreateResponse> {
    return this.request<WatchCreateResponse>(`/watch`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(req),
    })
  }

  async watchGet(watchId: string): Promise<WatchGetResponse> {
    return this.request<WatchGetResponse>(`/watch/${watchId}`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchList(): Promise<WatchListResponse> {
    return this.request<WatchListResponse>(`/watch`, { headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchDelete(watchId: string): Promise<WatchDeleteResponse> {
    return this.request<WatchDeleteResponse>(`/watch/${watchId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${this.apiKey}` } })
  }

  async watchPause(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/watch/${watchId}/pause`, { method: 'PATCH', headers: this.headers() })
  }

  async watchResume(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/watch/${watchId}/resume`, { method: 'PATCH', headers: this.headers() })
  }

  async watchCheck(watchId: string): Promise<WatchActionResponse> {
    return this.request<WatchActionResponse>(`/watch/${watchId}/check`, { method: 'POST', headers: this.headers() })
  }
}