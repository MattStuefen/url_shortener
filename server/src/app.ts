import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import path from "path";
import {Logger} from "@server/utilities/logger";
import {FastifyError} from "@fastify/error";

export const app: FastifyInstance = Fastify();
app.register(require("@fastify/static"), {root: path.join(__dirname, '../../client/dist')});
app.register(require("@server/plugins/db-plugin"));

app.register(async (routes: FastifyInstance) => {
    routes.register(require("@server/routes/health"));
    routes.register(require("@server/routes/url-shortener"), {prefix: '/api'});
});

app.setNotFoundHandler(async (req: FastifyRequest, res: FastifyReply) => {
    const longUrl = await app.db.getLongUrl(req.url.slice(1));
    if(longUrl)
        await res.code(301).redirect(longUrl);
    else
        await res.code(404).send();
});

app.addHook("onResponse", async (req: FastifyRequest, res: FastifyReply) => {
    Logger.info(`${req.method} ${req.url} ${res.statusCode} ${res.getResponseTime()?.toFixed(3)} ms`);
});

app.addHook("onError", async(req: FastifyRequest, res: FastifyReply, err: FastifyError) => {
    Logger.error(`[ERROR] ${err.stack}`);
});
