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

  async getCompatiblePrinters(idDevice) {
    try {
      const device = await this.getById(idDevice);
      if (device.type != "toner") return null;
      return await this.dao.getCompatiblePrinters(idDevice);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatiblePrinter(idDevice, idPrinter) {
    try {
      const toner = await this.getById(idDevice);
      if (!toner) return null;
      if (toner.type != "toner") return null;
      const printer = await this.getById(idPrinter);
      if (!printer) return null;
      if (printer.type != "impresora") return null;
      const printers = toner.compatiblePrinters;
      if (printers.includes(idPrinter)) return null;
      return await this.dao.addCompatiblePrinter(idDevice, idPrinter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompatibleToners(idDevice) {
    try {
      const device = await this.getById(idDevice);
      if (device.type != "impresora") return null;
      return await this.dao.getCompatibleToners(idDevice);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatibleToner(idDevice, idToner) {
    try {
      const printer = await this.getById(idDevice);
      if (!printer) return null;
      if (printer.type != "impresora") return null;
      const toner = await this.getById(idToner);
      if (!toner) return null;
      if (toner.type != "toner") return null;
      const toners = printer.compatibleToners;
      if (toners.includes(idToner)) return null;
      return await this.dao.addCompatibleToner(idDevice, idToner);
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
      if (devices.length == 0) return null;
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
