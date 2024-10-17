import express from "express";
import cookieParser from "cookie-parser";
import logger from "./errors/Logger.js";
import morgan from "morgan";
import helmet from "helmet";
import { __dirname } from "./utils/utils.js";
import "dotenv/config";
import { errorHandler } from "./middlewares/errorHandler.js";
import Routes from "./routes/routes.js";
const routes = new Routes();

const app = express();

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .use(cookieParser());

app.use("/", routes.getRouter());

app.use(errorHandler);

const httpServer = app.listen(config.PORT, () =>
  logger.info(`Server ok en puerto ${config.PORT}`)
);
