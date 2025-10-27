/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CrawlCreateRequest = {
    url: string;
    format?: CrawlCreateRequest.format;
    depth?: number;
    link_limit?: number;
    include_subdomains?: boolean;
    include_html?: boolean;
    /**
     * Bypass cache and fetch fresh content
     */
    fresh?: boolean;
    /**
     * URL patterns to match (e.g., ["/blog*", "/docs*"])
     */
    patterns?: Array<string>;
    /**
     * Proxy rotation mode
     */
    proxy_mode?: CrawlCreateRequest.proxy_mode;
    /**
     * ISO country code (e.g., "us", "eu", "gb")
     */
    proxy_region?: string;
    /**
     * Sticky session key for proxy consistency
     */
    proxy_session?: string;
    /**
     * Enable user agent rotation
     */
    rotate_user_agent?: boolean;
    /**
     * Enable anti-bot detection and pivoting
     */
    enable_bot_protection?: boolean;
    /**
     * Max consecutive errors before pivoting strategy
     */
    max_consecutive_errors?: number;
    /**
     * Specific user agent to use (selected by backend)
     */
    user_agent?: string;
    /**
     * CSS selectors to wait for before considering page loaded (for dynamic content)
     */
    wait_for_selectors?: Array<string>;
    /**
     * Optional webhook URL to notify when job completes
     */
    webhook_url?: string;
    /**
     * Optional HTTP headers to include in webhook requests
     */
    webhook_headers?: Record<string, string>;
};
export namespace CrawlCreateRequest {
    export enum format {
        MARKDOWN = 'markdown',
        HTML = 'html',
    }
    /**
     * Proxy rotation mode
     */
    export enum proxy_mode {
        OFF = 'off',
        SHARED_POOL = 'shared_pool',
        RESIDENTIAL = 'residential',
    }
}

