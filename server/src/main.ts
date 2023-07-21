import "module-alias/register";
import {app} from "@server/app";

const run = async () => {
    const port = parseInt(process.env.PORT ?? '3000');
    await app.listen({ port: port, host: '0.0.0.0' });
    app.log.info(`Listening on port: ${port}`);
};

run().then();