/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParseValidationResult = {
    /**
     * Whether the response is valid
     */
    is_valid: boolean;
    /**
     * Format of the response
     */
    format: ParseValidationResult.format;
    /**
     * Validation errors
     */
    errors: Array<string>;
    /**
     * JSON fields discovered
     */
    fields_found?: Array<string>;
    /**
     * CSV row count
     */
    row_count?: number;
    /**
     * CSV column count
     */
    column_count?: number;
};
export namespace ParseValidationResult {
    /**
     * Format of the response
     */
    export enum format {
        JSON = 'json',
        CSV = 'csv',
    }
}

