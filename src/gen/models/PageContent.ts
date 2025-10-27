/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageMetadata } from './PageMetadata';
export type PageContent = {
    markdown: string;
    html?: string;
    /**
     * All discovered links on the page
     */
    links: Array<string>;
    metadata: PageMetadata;
};

