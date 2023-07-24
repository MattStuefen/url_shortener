import {app} from "@server/app";
import {Logger} from "@server/utilities/logger";

describe('URL Shortener', () => {
    beforeAll(() => {
        return Logger.level = "fatal";
    });

    it('urls route should return list of urls', async () => {
        const count = 2;
        const res = await app.inject({method: 'GET', url: `/api/urls?count=${count}`});
        expect(res.statusCode).toBe(200);
        expect(res.json().length).toBe(count);
    });

    it('should be able to add short url exactly once', async () => {
        let res = await app.inject({method: 'GET', url: 'gmail'});
        expect(res.statusCode).toBe(404);

        const newUrl = {shortUrl: "gmail", longUrl: "http://www.gmail.com/"};
        res = await app.inject({method: 'POST', url: '/api/url', body: newUrl});
        expect(res.statusCode).toBe(200);

        res = await app.inject({method: 'GET', url: 'gmail'});
        expect(res.statusCode).toBe(301);

        res = await app.inject({method: 'POST', url: '/api/url', body: newUrl});
        expect(res.statusCode).toBe(409);
    });

    it('should not be able to add protected short url', async () => {
        const newUrl = {shortUrl: "health", longUrl: "http://www.test.com/"};
        const res = await app.inject({method: 'POST', url: '/api/url', body: newUrl});
        expect(res.statusCode).toBe(409);
    });

    it('url route should return an error w/ invalid input', async () => {
        const newUrl = {};
        const res = await app.inject({method: 'POST', url: '/api/url', body: newUrl});
        expect(res.statusCode).toBe(500);
    });

    it('short url in db should forward to long url', async () => {
        const res = await app.inject({method: 'GET', url: 'google'});
        expect(res.statusCode).toBe(301);
    });

    it('short url not in db should return not found', async () => {
        const res = await app.inject({method: 'GET', url: 'lougle'});
        expect(res.statusCode).toBe(404);
    });

});
