import MongoDao from "./mongoDao.js";
import { DeviceModel } from "./models/deviceModel.js";

export default class DeviceDao extends MongoDao {
  constructor() {
    super(DeviceModel);
  }

  async getCompatiblePrinters(idToner) {
    try {
      return await this.getById(idToner).compatiblePrinters;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatiblePrinter(idToner, idPrinter) {
    try {
      const device = await this.getById(idToner);
      device.compatiblePrinters.push(idPrinter);
      await device.save();
      return device;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCompatibleToners(idPrinter) {
    try {
      return await this.getById(idPrinter).compatibleToners;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCompatibleToner(idPrinter, idToner) {
    try {
      const device = await this.getById(idPrinter);
      device.compatibleToners.push(idToner);
      await device.save();
      return device;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByType(type) {
    try {
      return await this.model.find({ type });
    } catch (error) {
      throw new Error(error);
    }
  }

  async setDescription(idDevice, description) {
    try {
      const device = await this.getById(idDevice);
      device.description = description;
      await device.save();
      return device;
    } catch (error) {
      throw new Error(error);
    }
  }

  async setImage(idDevice, image) {
    try {
      const device = await this.getById(idDevice);
      device.image = image;
      await device.save();
      return device;
    } catch (error) {
      throw new Error(error);
    }
  }
}
