import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
const base62 = require('base62-random');

const invalidShortUrls: Set<string> = new Set<string>(["health"]);

export default async function routes(router: FastifyInstance) {
    router.get("/urls", async(req: FastifyRequest) => {
        const query = <Record<string, any>> req.query;
        return router.db.getRecentUrls(query.count);
    });

    router.post("/url", async(req: FastifyRequest, res: FastifyReply) => {
        const body = <Record<string, any>> req.body;
        if(invalidShortUrls.has(body.shortUrl))
            return res.code(409).send();

        const status = router.db.insertUrl(body.longUrl, body.shortUrl || base62(8)) ? 200 : 409;
        return res.code(status).send();
    });
}