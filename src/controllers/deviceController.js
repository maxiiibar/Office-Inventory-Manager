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
      const { name } = req.params;
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

  // getByType = async (req, res, next)  => {
  //   try {
  //     const { type } = req.params;
  //     const response = await this.service.getByType(type);
  //     switch(response){
  //       case -1:
  //         return httpResponse.BadRequest(res, 'Invalid type')
  //       case -2:

  //     }
  //   } catch (error) {
      
  //   }
  // }
}
