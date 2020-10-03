import compose from "koa-compose";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import logger from "./logger";
import bodyParser from "koa-bodyparser";

export default compose([helmet(),cors(), logger, bodyParser()]);
