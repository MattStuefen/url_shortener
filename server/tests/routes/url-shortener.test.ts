import {app} from "@server/app";

describe('URL Shortener', () => {
    it('urls should return default list of urls', async () => {
        const res = await app.inject({method: 'GET', url: '/api/urls'});
        expect(res.statusCode).toBe(200);
        expect(res.json().length).toBe(3);
    });
});
