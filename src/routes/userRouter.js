import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import UserController from "../controllers/userController.js";
const controller = new UserController();

const router = Router();

router.post("/login", controller.login);

router.post("/register", controller.register);

// router.post("/reset-pass", checkAuth, controller.generateResetPass);

// router.put("/new-pass", checkAuth, controller.updatePass);

router.post("/logout", checkAuth, controller.logOut);

export default router;
