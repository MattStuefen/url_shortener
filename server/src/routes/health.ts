import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export default async function routes(router: FastifyInstance) {
    router.get("/health", async(req: FastifyRequest, res: FastifyReply) => {
        res.headers({'cache-control' : 'no-cache'});
        return {status: "available", db: "unavailable"};
    });
}