export type ScrapeFormat = 'markdown' | 'html' | 'text' | 'links'
export type DeviceType = 'desktop' | 'mobile'

export interface ScrapeParams {
  url: string
  format?: ScrapeFormat
  render_js?: boolean
  wait?: number
  device?: DeviceType
  depth?: number
  max_links?: number
  fresh?: boolean
}

export interface ScrapeContentMetadata { status_code: number }
export interface ScrapeLinksMetadata { status_code: number; depth?: number }

export interface ScrapeContentResponse {
  success: boolean
  url: string
  content: string
  title?: string
  metadata: ScrapeContentMetadata
}

export interface ScrapeLinksResponse {
  success: boolean
  url: string
  links: string[]
  discovered: number
  metadata: ScrapeLinksMetadata
}

export type ScrapeResponse = ScrapeContentResponse | ScrapeLinksResponse

export type JobType = 'crawl' | 'screenshot'
export type JobStatus = 'processing' | 'completed' | 'failed' | 'not_found' | 'expired'

export interface JobCreateRequest {
  url: string
  type: 'crawl'
  format?: 'markdown' | 'html' | 'text'
  link_limit?: number
  depth?: number
  include_subdomains?: boolean
  render_js?: boolean
  patterns?: string[]
}

export interface JobCreateResponse {
  success: boolean
  job_id: string
  type: 'crawl'
  status: 'processing'
  status_url: string
}

export interface PageMetadata { title?: string; status_code?: number }
export interface PageData { markdown?: string; html?: string; metadata?: PageMetadata }
export interface CrawlStatistics { total_pages?: number; successful_pages?: number; failed_pages?: number }

export interface JobDataCrawl {
  url: string
  crawl_data: Record<string, PageData>
  error_data: Record<string, string>
  statistics?: CrawlStatistics
  render_js?: boolean
}

export interface ScreenshotMetadata {
  device?: string
  format?: string
  width?: number
  height?: number
  file_size?: number
  load_time?: number
  quality?: number
  device_scale?: number
}

export interface JobDataScreenshot {
  url: string
  screenshot: string
  metadata?: ScreenshotMetadata
}

export type JobData = JobDataCrawl | JobDataScreenshot

export interface JobStatusResponse {
  job_id: string
  type: JobType
  status: JobStatus
  data?: JobData
}

export type ScreenshotFormat = 'png' | 'jpeg' | 'webp'
export type WaitUntil = 'load' | 'domcontentloaded' | 'networkidle'
export type BlockResource = 'image' | 'stylesheet' | 'script' | 'font'

export interface ScreenshotRequest {
  url: string
  device?: string
  full_page?: boolean
  format?: ScreenshotFormat
  quality?: number
  width?: number
  height?: number
  device_scale?: number
  is_mobile?: boolean
  has_touch?: boolean
  is_landscape?: boolean
  delay?: number
  timeout?: number
  wait_for_selector?: string
  wait_until?: WaitUntil
  scroll_delay?: number
  click_selector?: string
  hide_selectors?: string[]
  block_ads?: boolean
  block_cookies?: boolean
  block_chats?: boolean
  block_trackers?: boolean
  block_resources?: BlockResource[]
  user_agent?: string
  headers?: Record<string, string>
  cookies?: Array<Record<string, string | number | boolean>>
  dark_mode?: boolean
  reduced_motion?: boolean
  high_contrast?: boolean
  disable_js?: boolean
  print_mode?: boolean
  ignore_https?: boolean
}

export interface ScreenshotCreateResponse {
  success: boolean
  job_id: string
  type: 'screenshot'
  status: 'processing'
  status_url: string
  url?: string
  screenshot?: string
  metadata?: ScreenshotMetadata
}

export interface ScreenshotGetResponse {
  success: boolean
  job_id: string
  url: string
  screenshot: string
  metadata?: ScreenshotMetadata
}

export type Frequency = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom'

export interface WatchCreateRequest {
  url: string
  frequency: Frequency
  notify_email?: string
  notification_preference?: 'changes_only' | 'all_runs'
  selector?: string
  include_html?: boolean
  include_image?: boolean
  full_page?: boolean
  quality?: number
  custom_frequency?: string
}

export interface WatchCreateResponse { success: boolean; watch_id: string; message?: string }

export interface Watch {
  id?: string
  user_id?: string
  url?: string
  frequency?: string
  notify_email?: string
  notification_preference?: 'changes_only' | 'all_runs'
  include_html?: boolean
  include_image?: boolean
  full_page?: boolean
  quality?: number
  selector?: string
  last_check?: string
  last_notification?: string
  status?: string
  created_at?: string
  updated_at?: string
  cron_job_name?: string
}

export interface WatchResult {
  id?: string
  executed_at?: string
  has_changed?: boolean
  change_type?: string
  content_hash?: string
  content?: string
  html_content?: string
  image_url?: string
}

export interface WatchGetResponse { success: boolean; watch?: Watch; results?: WatchResult[] }
export interface WatchListResponse { success: boolean; total?: number; watches: Watch[] }
export interface WatchDeleteResponse { success: boolean; message?: string }
export type WatchActionResponse = WatchDeleteResponse