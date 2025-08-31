/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScrapeMetadata } from './ScrapeMetadata';
export type ScrapeResponse = {
    success: boolean;
    url: string;
    title?: string;
    /**
     * Markdown content or links depending on format
     */
    content?: string;
    /**
     * HTML content (only if include_html=true)
     */
    html?: string;
    links?: Array<string>;
    discovered?: number;
    metadata: ScrapeMetadata;
};

