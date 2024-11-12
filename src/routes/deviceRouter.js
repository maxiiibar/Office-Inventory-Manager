import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import DeviceController from "../controllers/deviceController.js";
const controller = new DeviceController();

const router = Router();

router.get("/", [checkAuth], controller.getAll);

router.get("/:id", [checkAuth], controller.getById);

router.get("/:type", [checkAuth], controller.getByType);

router.get("/:idToner", [checkAuth], controller.getCompatiblePrinters);

router.get("/:idPrinter", [checkAuth], controller.getCompatibleToners);

router.post("/", [checkAuth], controller.create);



export default router;
