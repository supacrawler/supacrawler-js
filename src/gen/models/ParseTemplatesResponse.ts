/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParseTemplatesResponse = {
    success: boolean;
    /**
     * Available templates with descriptions
     */
    templates: Record<string, string>;
    /**
     * Supported content types
     */
    content_types: Array<string>;
    /**
     * Supported output formats
     */
    output_formats: Array<string>;
};

