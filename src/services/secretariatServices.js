import Services from "./classServices.js";
import DeviceServices from "./deviceServices.js";
const deviceServices = new DeviceServices();
import SecretariatDao from "../daos/secretariatDao.js";
const secretariatDao = new SecretariatDao();

export default class SecretariatServices extends Services {
  constructor() {
    super(secretariatDao);
  }

  async getPrinters(idSecretariat) {
    try {
      const secretariat = await this.getById(idSecretariat);
      if (!secretariat) return null;
      return await this.dao.getPrinters(idSecretariat);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPrinter(idSecretariat, idPrinter) {
    try {
      const secretariat = await this.getById(idSecretariat);
      if (!secretariat) return -1;
      const printer = await deviceServices.getById(idPrinter);
      if (!printer) return -2;
      return await this.dao.addPrinter(idSecretariat, idPrinter);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOrders(idSecretariat) {
    try {
      const secretariat = await this.getById(idSecretariat);
      if (!secretariat) return null;
      return await this.dao.getOrders(idSecretariat);
    } catch (error) {
      throw new Error(error);
    }
  }

  // async addOrder(idSecretariat, idOrder) {
  //   try {
  //     const secretariat = await this.getById(idSecretariat);
  //     if (!secretariat) return -1;
  //     const printer = await deviceServices.getById(idPrinter);
  //     if (!printer) return -2;
  //     const printers = await secretariat.printers;
  //     if (printers.includes(idPrinter)) return -3;
  //     return await this.dao.addPrinter(idSecretariat, idPrinter);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
