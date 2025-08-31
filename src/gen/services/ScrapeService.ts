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
     * @param format
     * @param depth
     * @param maxLinks
     * @param renderJs
     * @param includeHtml
     * @param fresh
     * @returns ScrapeResponse Scrape response
     * @throws ApiError
     */
    public getV1Scrape(
        url: string,
        format?: 'markdown' | 'links',
        depth?: number,
        maxLinks?: number,
        renderJs?: boolean,
        includeHtml?: boolean,
        fresh?: boolean,
    ): CancelablePromise<ScrapeResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/scrape',
            query: {
                'url': url,
                'format': format,
                'depth': depth,
                'max_links': maxLinks,
                'render_js': renderJs,
                'include_html': includeHtml,
                'fresh': fresh,
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
