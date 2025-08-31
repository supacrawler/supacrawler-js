/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScreenshotCreateRequest } from '../models/ScreenshotCreateRequest';
import type { ScreenshotGetResponse } from '../models/ScreenshotGetResponse';
import type { ScreenshotJobResponse } from '../models/ScreenshotJobResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ScreenshotsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a screenshot job or stream sync file
     * @param requestBody
     * @returns ScreenshotJobResponse Screenshot job created or image streamed
     * @throws ApiError
     */
    public postV1Screenshots(
        requestBody: ScreenshotCreateRequest,
    ): CancelablePromise<ScreenshotJobResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/screenshots',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Get screenshot artifact by job id
     * @param jobId
     * @returns ScreenshotGetResponse Screenshot content or URL
     * @throws ApiError
     */
    public getV1Screenshots(
        jobId: string,
    ): CancelablePromise<ScreenshotGetResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/screenshots',
            query: {
                'job_id': jobId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
}
