import fp from 'fastify-plugin';
import {FastifyInstance} from "fastify";
import {Dao} from "@server/db/dao";
import pgDb from "@server/db/pg-db";
import ramDb from "@server/db/ram-db";
import {Logger} from "@server/utilities/logger";

declare module 'fastify' {
    interface FastifyInstance {
        db: Dao
    }
}

export default fp(async (app: FastifyInstance) => {
    let usePgSql: boolean = false;
    try{
        usePgSql = await pgDb.initialize();
    } catch {
        app.decorate('db', ramDb);
    }

    app.decorate('db', usePgSql ? pgDb : ramDb);
    Logger.info(`DB Mode: ${usePgSql ? "PostgreSQL" : "In Memory"}`);
});
