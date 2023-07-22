import "module-alias/register";
import {app} from "@server/app";
import {Logger} from "@server/utilities/logger";

const run = async () => {
    const port = parseInt(process.env.PORT ?? '3000');
    await app.listen({ port: port, host: '0.0.0.0' });
    Logger.info(`Listening on port: ${port}`);
};

run().then();