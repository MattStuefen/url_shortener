import {UrlRecord} from "@server/db/models/url-record";

export type Dao = {
    initialize(): Promise<boolean>;
    insertUrl(longUrl: string, shortUrl: string): Promise<UrlRecord>;
    getRecentUrls(count: number): Promise<UrlRecord[]>;
    getLongUrl(shortUrl: string): Promise<string>;
}