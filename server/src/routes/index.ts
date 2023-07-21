import {FastifyInstance} from "fastify";

export default async function routes(router: FastifyInstance) {
    router.get("/hello_world", async() => {
        return {hello: "world"};
    });
}