import {app} from "@server/app";
import {Logger} from "@server/utilities/logger";

describe('Health Check', () => {
    beforeAll(() => {
        return Logger.level = "fatal";
    });

    it('health check should return json status', async () => {
        const res = await app.inject({method: 'GET', url: `/health`});
        expect(res.statusCode).toBe(200);
        expect(res.json().status).toBe("available");
        expect(res.json().db).toBe("available");
        expect(res.json().other).toBeUndefined();
    });
});
