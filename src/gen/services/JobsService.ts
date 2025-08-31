/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlCreateRequest } from '../models/CrawlCreateRequest';
import type { CrawlCreateResponse } from '../models/CrawlCreateResponse';
import type { CrawlStatusResponse } from '../models/CrawlStatusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class JobsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a crawl job
     * @param requestBody
     * @returns CrawlCreateResponse Crawl job created
     * @throws ApiError
     */
    public postV1Crawl(
        requestBody: CrawlCreateRequest,
    ): CancelablePromise<CrawlCreateResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/crawl',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Get crawl job status/result
     * @param jobId
     * @returns CrawlStatusResponse Crawl job status
     * @throws ApiError
     */
    public getV1Crawl(
        jobId: string,
    ): CancelablePromise<CrawlStatusResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/crawl/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
}
