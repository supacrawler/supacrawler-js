/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScreenshotMetadata } from './ScreenshotMetadata';
export type ScreenshotGetResponse = {
    success: boolean;
    job_id?: string;
    /**
     * Source URL of the page
     */
    url?: string;
    /**
     * Signed or public URL to the image
     */
    screenshot?: string;
    status?: ScreenshotGetResponse.status;
    metadata?: ScreenshotMetadata;
};
export namespace ScreenshotGetResponse {
    export enum status {
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

