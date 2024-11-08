import Controller from "./classController.js";
import DeviceServices from "../services/deviceServices.js";
const deviceServices = new DeviceServices();
import HttpResponse from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class DeviceController extends Controller {
  constructor() {
    super(deviceServices);
  }

  getByName = async (req, res, next) => {
    try {
      const { name } = req.body;
      const response = await this.service.getByName(name);
      if (!response)
        return httpResponse.NotFound(res, "There is no device with that name.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  getCompatiblePrinters = async (req, res, next) => {
    try {
      const { idToner } = req.params;
      const response = await this.service.getCompatiblePrinters(idToner);
      if (!response)
        return httpResponse.NotFound(res, "This device is not a toner.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  addCompatiblePrinter = async (req, res, next) => {
    try {
      const { idToner, idPrinter } = req.params;
      const response = await this.service.addCompatiblePrinter(
        idToner,
        idPrinter
      );
      switch (response) {
        case -1:
          return httpResponse.NotFound(res, "Toner not found.");
        case -2:
          return httpResponse.BadRequest(res, "Device is not a toner.");
        case -3:
          return httpResponse.NotFound(res, "Printer not found.");
        case -4:
          return httpResponse.BadRequest(res, "Device is not a printer.");
        case -5:
          return httpResponse.Conflict(
            res,
            "The printer is already in the list."
          );
        default:
          return httpResponse.Ok(res, response);
      }
    } catch (error) {
      next(error);
    }
  };

  getCompatibleToners = async (req, res, next) => {
    try {
      const { idPrinter } = req.params;
      const response = await this.service.getCompatiblePrinters(idPrinter);
      if (!response)
        return httpResponse.NotFound(res, "This device is not a toner.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  addCompatibleToner = async (req, res, next) => {
    try {
      const { idPrinter, idToner } = req.params;
      const response = await this.service.addCompatibleToner(
        idPrinter,
        idToner
      );
      switch (response) {
        case -1:
          return httpResponse.NotFound(res, "Printer not found.");
        case -2:
          return httpResponse.BadRequest(res, "Device is not a printer.");
        case -3:
          return httpResponse.NotFound(res, "Toner not found.");
        case -4:
          return httpResponse.BadRequest(res, "Device is not a toner.");
        case -5:
          return httpResponse.Conflict(
            res,
            "The toner is already in the list."
          );
        default:
          return httpResponse.Ok(res, response);
      }
    } catch (error) {
      next(error);
    }
  };

  getByType = async (req, res, next) => {
    try {
      const { type } = req.params;
      const response = await this.service.getByType(type);
      if (!response) return httpResponse.BadRequest(res, "Invalid type.");
      return response;
    } catch (error) {
      next(error);
    }
  };

  setDescription = async (req, res, next) => {
    try {
      const { idDevice, description } = req.params;
      const response = await this.service.setDescription(idDevice, description);
      if (!response) return httpResponse.NotFound(res, "Device not found.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };

  setImage = async (req, res, next) => {
    try {
      const { idDevice, image } = req.params;
      const response = await this.service.setImage(idDevice, image);
      if (!response) return httpResponse.NotFound(res, "Device not found.");
      return httpResponse.Ok(res, response);
    } catch (error) {
      next(error);
    }
  };
}
