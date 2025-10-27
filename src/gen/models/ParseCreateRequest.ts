/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParseCreateRequest = {
    /**
     * Natural language prompt that may include URLs and extraction instructions
     */
    prompt: string;
    /**
     * Optional JSON schema for structured output
     */
    schema?: Record<string, any>;
    /**
     * Preferred output format
     */
    output_format?: ParseCreateRequest.output_format;
    /**
     * Enable streaming responses for real-time results
     */
    stream?: boolean;
    /**
     * Maximum crawl depth (if crawling is needed)
     */
    max_depth?: number;
    /**
     * Maximum pages to process
     */
    max_pages?: number;
};
export namespace ParseCreateRequest {
    /**
     * Preferred output format
     */
    export enum output_format {
        JSON = 'json',
        CSV = 'csv',
        MARKDOWN = 'markdown',
        XML = 'xml',
        YAML = 'yaml',
    }
}

