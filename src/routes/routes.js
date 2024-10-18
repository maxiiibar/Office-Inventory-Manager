import { Router } from "express";
import UserRouter from "./userRouter.js";

export default class Routes {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use("/users", UserRouter);
  }

  getRouter() {
    return this.router;
  }
}
