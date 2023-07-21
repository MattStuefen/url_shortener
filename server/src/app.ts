import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import path from "path";
import {Logger} from "@server/utilities/logger";
import {FastifyError} from "@fastify/error";

export const app: FastifyInstance = Fastify();
app.register(require("@fastify/static"), {root: path.join(__dirname, '../../client/dist')});

app.register(async (routes: FastifyInstance) => {
    routes.register(require("@server/routes/health"));
    routes.register(require("@server/routes/index"));
});

app.addHook("onResponse", async (req: FastifyRequest, res: FastifyReply) => {
    Logger.info(`${req.method} ${req.url} ${res.statusCode} ${res.getResponseTime()?.toFixed(3)} ms`);
});

app.addHook("onError", async(req: FastifyRequest, res: FastifyReply, err: FastifyError) => {
    Logger.error(`[ERROR] ${err.message}`);
});
