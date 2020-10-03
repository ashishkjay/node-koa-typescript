import composedMiddleware from "./middleware/composed";
// import compose from 'koa-compose';
// import helmet from 'koa-helmet';
// import cors from "@koa/cors";
// import logger from './middleware/logger';
// import bodyParser from "koa-bodyparser";
import Koa from "koa";
import jwt from "koa-jwt";
import "reflect-metadata";
import { cron } from "./cron";
import { config } from "./config";
import { createConnection } from "typeorm";
import { protectedRouter } from "./protectedRoutes";
import { unprotectedRouter } from "./unprotectedRoutes";


// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection({
    type: "postgres",
    url: config.databaseUrl,
    synchronize: true,
    logging: false,
    entities: config.dbEntitiesPath,
    extra: {
        ssl: config.dbsslconn, // if not development, will use SSL
    }
}).then(async () => {
    const app = new Koa();

    // Provides important security headers to make your app more secure
    // Enable cors with default options
    // Logger middleware -> use pino as logger (logger.ts)
    // Enable bodyParser with default options
    // app.use(helmet())
    // app.use(cors())
    // app.use(logger())
    // app.use(bodyParser())
    app.use(composedMiddleware);
    // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    // do not protect swagger-json and swagger-html endpoints
    app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

    // These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // Register cron job to do any action needed
    cron.start();

    app.listen(config.port);

    console.log(`Server running on port ${config.port}`);

}).catch((error: string) => console.log("TypeORM connection error: ", error));