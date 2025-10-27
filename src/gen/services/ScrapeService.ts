/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScrapeResponse } from '../models/ScrapeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ScrapeService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Scrape a single URL
     * @param url
     * @param format Output format for scraped content (currently only markdown is supported)
     * @param depth
     * @param maxLinks
     * @param includeHtml
     * @param fresh
     * @param proxyMode
     * @param proxyRegion
     * @param proxySession
     * @param rotateUserAgent
     * @param enableBotProtection
     * @param maxConsecutiveErrors
     * @param userAgent
     * @param waitForSelectors
     * @returns ScrapeResponse Scrape response
     * @throws ApiError
     */
    public getV1Scrape(
        url: string,
        format: 'markdown' = 'markdown',
        depth?: number,
        maxLinks?: number,
        includeHtml?: boolean,
        fresh?: boolean,
        proxyMode: 'off' | 'shared_pool' | 'residential' = 'off',
        proxyRegion?: string,
        proxySession?: string,
        rotateUserAgent: boolean = true,
        enableBotProtection: boolean = true,
        maxConsecutiveErrors: number = 5,
        userAgent?: string,
        waitForSelectors?: Array<string>,
    ): CancelablePromise<ScrapeResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/scrape',
            query: {
                'url': url,
                'format': format,
                'depth': depth,
                'max_links': maxLinks,
                'include_html': includeHtml,
                'fresh': fresh,
                'proxy_mode': proxyMode,
                'proxy_region': proxyRegion,
                'proxy_session': proxySession,
                'rotate_user_agent': rotateUserAgent,
                'enable_bot_protection': enableBotProtection,
                'max_consecutive_errors': maxConsecutiveErrors,
                'user_agent': userAgent,
                'wait_for_selectors': waitForSelectors,
            },
            errors: {
                400: `Bad request`,
                403: `Forbidden - Access denied (e.g., robots.txt disallowed)`,
                404: `Not found`,
                408: `Request timeout`,
                422: `Unprocessable entity - Content filtered or invalid`,
                429: `Too many requests - Rate limited`,
                500: `Server error`,
            },
        });
    }
}
