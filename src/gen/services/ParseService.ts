/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParseCreateRequest } from '../models/ParseCreateRequest';
import type { ParseExamplesResponse } from '../models/ParseExamplesResponse';
import type { ParseResponse } from '../models/ParseResponse';
import type { ParseTemplatesResponse } from '../models/ParseTemplatesResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ParseService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get parse job status and result
     * Retrieve the status and results of a previously submitted parse job
     * @param jobId The job ID returned from the POST /v1/parse request
     * @returns ParseResponse Parse job status and result
     * @throws ApiError
     */
    public getV1Parse(
        jobId: string,
    ): CancelablePromise<ParseResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/parse',
            query: {
                'job_id': jobId,
            },
            errors: {
                404: `Not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Parse HTML or Markdown content using LLM
     * Extract structured data from HTML or Markdown content with customizable output schemas
     * @param requestBody
     * @returns ParseResponse Parse operation result
     * @throws ApiError
     */
    public postV1Parse(
        requestBody: ParseCreateRequest,
    ): CancelablePromise<ParseResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/parse',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                422: `Unprocessable entity - Content filtered or invalid`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get available parse templates
     * List all available prompt templates with descriptions and supported content types
     * @returns ParseTemplatesResponse Available templates and configuration
     * @throws ApiError
     */
    public getV1ParseTemplates(): CancelablePromise<ParseTemplatesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/parse/templates',
        });
    }
    /**
     * Get example output specifications
     * Get example output schemas for different content types
     * @returns ParseExamplesResponse Example output specifications
     * @throws ApiError
     */
    public getV1ParseExamples(): CancelablePromise<ParseExamplesResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/parse/examples',
        });
    }
}
