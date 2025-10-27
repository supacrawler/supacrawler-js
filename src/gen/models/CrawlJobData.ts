/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlStatistics } from './CrawlStatistics';
import type { PageContent } from './PageContent';
export type CrawlJobData = {
    url?: string;
    crawl_data?: Record<string, PageContent>;
    error_data?: Record<string, string>;
    statistics?: CrawlStatistics;
};

