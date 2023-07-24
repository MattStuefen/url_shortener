import {UrlRecord} from "@server/db/models/url-record";
import {Dao} from "@server/db/dao";

const urls: UrlRecord[] = [
    <UrlRecord>{id: 1, longUrl: "https://www.google.com", shortUrl: "google"},
    <UrlRecord>{id: 2, longUrl: "https://www.amazon.com", shortUrl: "amazon"},
    <UrlRecord>{id: 3, longUrl: "https://www.ebay.com", shortUrl: "ebay"}
];

const initialize = async (): Promise<boolean> => {
    return Promise.resolve(true);
};

const insertUrl = (longUrl: string, shortUrl: string): Promise<boolean> => {
    if(urls.some(x => x.shortUrl == shortUrl))
        return Promise.resolve(false);

    const newId = (urls.slice(-1)[0]?.id ?? 0) + 1;
    urls.push(<UrlRecord>{id: newId, longUrl: longUrl, shortUrl: shortUrl});
    return Promise.resolve(true);
};

const getRecentUrls = (count: number): Promise<UrlRecord[]> => {
    return Promise.resolve(urls.slice(-count).reverse());
};

const getLongUrl = (shortUrl: string): Promise<string> => {
    return Promise.resolve(urls.filter(x => x.shortUrl == shortUrl)[0]?.longUrl);
};

export default <Dao> {
    initialize,
    insertUrl,
    getRecentUrls,
    getLongUrl
};