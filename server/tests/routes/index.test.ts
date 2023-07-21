import {app} from "@server/app";

describe('Index', () => {
    it('hello_world should return json object', async () => {
        const res = await app.inject({method: 'GET', url: '/hello_world'});
        expect(res.statusCode).toBe(200);
        expect(res.json()['hello']).toBe('world');
    });
});
