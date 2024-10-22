import express from "express";
import cookieParser from "cookie-parser";
import logger from "./errors/Logger.js";
import morgan from "morgan";
import helmet from "helmet";
import ConnectMongoDB from "./db/database.js";
import { __dirname } from "./utils/utils.js";
import Routes from "./routes/routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "dotenv/config";
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

ConnectMongoDB.getInstance();

const httpServer = app.listen(process.env.PORT, () =>
  logger.info(`Server ok en puerto ${process.env.PORT}`)
);
