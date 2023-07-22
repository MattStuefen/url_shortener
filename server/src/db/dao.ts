import {UrlRecord} from "@server/db/models/url-record";

export type Dao = {
    insertUrl(longUrl: string, shortUrl: string): boolean;
    getRecentUrls(count: number): UrlRecord[];
    getLongUrl(shortUrl: string): string;
}