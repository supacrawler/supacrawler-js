/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlJobData } from './CrawlJobData';
export type CrawlStatusResponse = {
    success: boolean;
    job_id?: string;
    status: CrawlStatusResponse.status;
    data?: CrawlJobData;
    error?: string;
};
export namespace CrawlStatusResponse {
    export enum status {
        PENDING = 'pending',
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

