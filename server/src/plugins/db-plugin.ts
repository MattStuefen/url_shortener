import fp from 'fastify-plugin';
import {FastifyInstance} from "fastify";
import {Dao} from "@server/db/dao";
import ramDb from "@server/db/ram-db";

declare module 'fastify' {
    interface FastifyInstance {
        db: Dao
    }
}

export default fp(async (app: FastifyInstance) => {
    app.decorate('db', ramDb);
});
