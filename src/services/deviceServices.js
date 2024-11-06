import Services from "./classServices";
import DeviceDao from "../daos/deviceDao";
const deviceDao = new DeviceDao();

export default class DeviceServices extends Services {
  constructor() {
    super(deviceDao);
  }

  async getByName(name) {
    try {
      return await this.dao.getByName(name);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompatiblePrinters(idToner) {
    try {
      const device = await this.getById(idToner);
      if (device.type != "toner") return null;
      return await this.dao.getCompatiblePrinters(idToner);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatiblePrinter(idToner, idPrinter) {
    try {
      const toner = await this.getById(idToner);
      if (!toner) return -1;
      if (toner.type != "toner") return -2;
      const printer = await this.getById(idPrinter);
      if (!printer) return -3;
      if (printer.type != "impresora") return -4;
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
      if (device.type != "impresora") return null;
      return await this.dao.getCompatibleToners(idPrinter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatibleToner(idPrinter, idToner) {
    try {
      const printer = await this.getById(idPrinter);
      if (!printer) return -1;
      if (printer.type != "impresora") return -2;
      const toner = await this.getById(idToner);
      if (!toner) return -3;
      if (toner.type != "toner") return -4;
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
      if (!response) return -1;
      const devices = await this.dao.getByType(type);
      if (devices.length == 0) return -2;
      return devices;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDescription(idDevice) {
    try {
      return await this.dao.getDescription(idDevice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
