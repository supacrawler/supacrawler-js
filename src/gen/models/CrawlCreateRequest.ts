/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CrawlCreateRequest = {
    url: string;
    format?: CrawlCreateRequest.format;
    depth?: number;
    link_limit?: number;
    include_subdomains?: boolean;
    render_js?: boolean;
    include_html?: boolean;
};
export namespace CrawlCreateRequest {
    export enum format {
        MARKDOWN = 'markdown',
        HTML = 'html',
    }
}

