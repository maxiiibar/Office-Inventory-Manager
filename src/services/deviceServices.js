import Services from "./classServices.js";
import DeviceDao from "../daos/deviceDao.js";
const deviceDao = new DeviceDao();

export default class DeviceServices extends Services {
  constructor() {
    super(deviceDao);
  }

  async getCompatiblePrinters(idToner) {
    try {
      const device = await this.getById(idToner);
      if (!device) return null;
      if (device.type !== "toner") return null;
      return await this.dao.getCompatiblePrinters(idToner);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatiblePrinter(idToner, idPrinter) {
    try {
      const toner = await this.getById(idToner);
      if (!toner) return -1;
      if (toner.type !== "toner") return -2;
      const printer = await this.getById(idPrinter);
      if (!printer) return -3;
      if (printer.type !== "impresora") return -4;
      const printers = toner.compatiblePrinters;
      if (printers.includes(idPrinter)) return -5;
      return await this.dao.addCompatiblePrinter(idToner, idPrinter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompatibleToners(idPrinter) {
    try {
      const device = await this.getById(idPrinter);
      if (device.type !== "impresora") return null;
      return await this.dao.getCompatibleToners(idPrinter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatibleToner(idPrinter, idToner) {
    try {
      const printer = await this.getById(idPrinter);
      if (!printer) return -1;
      if (printer.type !== "impresora") return -2;
      const toner = await this.getById(idToner);
      if (!toner) return -3;
      if (toner.type !== "toner") return -4;
      const toners = printer.compatibleToners;
      if (toners.includes(idToner)) return -5;
      return await this.dao.addCompatibleToner(idPrinter, idToner);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByType(type) {
    try {
      const types = [
        "toner",
        "notebook",
        "teclado",
        "mouse",
        "impresora",
        "cable",
        "proyector",
      ];
      const response = types.find((element) => element === type);
      if (!response) return null;
      return await this.dao.getByType(type);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setDescription(idDevice, description) {
    try {
      const response = await this.getById(idDevice);
      if (!response) return null;
      return await this.dao.setDescription(idDevice, description);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setImage(idDevice, image) {
    try {
      const response = await this.getById(idDevice);
      if (!response) return null;
      return await this.dao.setImage(idDevice, image);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(idDevice) {
    try {
      const device = await this.getById(idDevice);
      let compatibles, type;
      if (!device) return null;
      if (device.type == "toner") {
        compatibles = device.compatiblePrinters;
        type = "toner";
      } else if (device.type == "impresora") {
        compatibles = device.compatibleToners;
        type = "impresora";
      } else {
        return await this.dao.delete(idDevice);
      }
      for (let index = 0; index < compatibles.length; index++) {
        const dispositivo = await this.getById(compatibles[index]);
        if (type == "toner") {
          const indice = dispositivo.compatiblePrinters.indexOf(idDevice);
          if (indice !== -1) dispositivo.compatiblePrinters.splice(indice, 1);
        } else {
          const indice = dispositivo.compatibleToners.indexOf(idDevice);
          if (indice !== -1) dispositivo.compatibleToners.splice(indice, 1);
        }
      }
      return await this.dao.delete(idDevice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
