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
  async getCompatibleToners(idDevice) {
    try {
      const device = await this.getById(idDevice);
      if (device.type != "impresora") return null;
      return await this.dao.getCompatibleToners(idDevice);
    } catch (error) {
      throw new Error(error);
    }
  }
}
