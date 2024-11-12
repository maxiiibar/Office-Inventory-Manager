import MongoDao from "./mongoDao.js";
import { SecretariatModel } from "./models/secretariatModel.js";

export default class SecretariatDao extends MongoDao {
  constructor() {
    super(SecretariatModel);
  }

  async getPrinters(idSecretariat) {
    try {
      return await this.getById(idSecretariat).printers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPrinter(idSecretariat, idPrinter) {
    try {
      const secretariat = await this.getById(idSecretariat);
      secretariat.printers.push(idPrinter);
      await secretariat.save();
      return secretariat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrders(idSecretariat) {
    try {
      return await this.getById(idSecretariat).orders;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addOrder(idSecretariat, idOrder) {
    try {
      const secretariat = await this.getById(idSecretariat);
      secretariat.orders.push(idOrder);
      await secretariat.save();
      return secretariat;
    } catch (error) {
      throw new Error(error);
    }
  }
}