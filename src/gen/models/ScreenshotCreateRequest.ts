/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ScreenshotCreateRequest = {
    url: string;
    full_page?: boolean;
    format?: ScreenshotCreateRequest.format;
    width?: number;
    height?: number;
    quality?: number;
    device?: ScreenshotCreateRequest.device;
    wait_until?: ScreenshotCreateRequest.wait_until;
    timeout?: number;
    dark_mode?: boolean;
    delay?: number;
    wait_for_selector?: string;
    click_selector?: string;
    hide_selectors?: Array<string>;
    block_ads?: boolean;
    block_cookies?: boolean;
    block_chats?: boolean;
    block_trackers?: boolean;
    block_resources?: Array<'image' | 'stylesheet' | 'script' | 'font'>;
    user_agent?: string;
    headers?: Record<string, string>;
    cookies?: Array<Record<string, any>>;
    reduced_motion?: boolean;
    high_contrast?: boolean;
    disable_js?: boolean;
    print_mode?: boolean;
    ignore_https?: boolean;
    device_scale?: number;
    is_mobile?: boolean;
    has_touch?: boolean;
    is_landscape?: boolean;
    stream?: boolean;
};
export namespace ScreenshotCreateRequest {
    export enum format {
        PNG = 'png',
        JPEG = 'jpeg',
        JPG = 'jpg',
        WEBP = 'webp',
    }
    export enum device {
        DESKTOP = 'desktop',
        MOBILE = 'mobile',
        TABLET = 'tablet',
        CUSTOM = 'custom',
    }
    export enum wait_until {
        LOAD = 'load',
        DOMCONTENTLOADED = 'domcontentloaded',
        NETWORKIDLE = 'networkidle',
    }
}

