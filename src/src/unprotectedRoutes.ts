import Router from "@koa/router";
import { general, oauth } from "./controller";

const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get("/", general.helloWorld);
unprotectedRouter.get("/oauth", oauth.getoAuth);

export { unprotectedRouter };