/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScreenshotMetadata } from './ScreenshotMetadata';
export type ScreenshotJobResponse = {
    success: boolean;
    job_id: string;
    type?: ScreenshotJobResponse.type;
    status?: ScreenshotJobResponse.status;
    url?: string;
    metadata?: ScreenshotMetadata;
};
export namespace ScreenshotJobResponse {
    export enum type {
        SCREENSHOT = 'screenshot',
    }
    export enum status {
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

