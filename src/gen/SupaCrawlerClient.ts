/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { HealthService } from './services/HealthService';
import { JobsService } from './services/JobsService';
import { ParseService } from './services/ParseService';
import { ScrapeService } from './services/ScrapeService';
import { ScreenshotsService } from './services/ScreenshotsService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class SupacrawlerClient {
    public readonly health: HealthService;
    public readonly jobs: JobsService;
    public readonly parse: ParseService;
    public readonly scrape: ScrapeService;
    public readonly screenshots: ScreenshotsService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.supacrawler.com',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.health = new HealthService(this.request);
        this.jobs = new JobsService(this.request);
        this.parse = new ParseService(this.request);
        this.scrape = new ScrapeService(this.request);
        this.screenshots = new ScreenshotsService(this.request);
    }
}

