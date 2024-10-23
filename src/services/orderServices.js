import Services from "./classServices.js";
import OrderDao from "../daos/orderDao.js";
const orderDao = new OrderDao();

export default class NotaPedidoServices extends Services {
  constructor() {
    super(orderDao);
  }

  async getBySupplier(supplier) {
    try {
      const response = await this.dao.getBySupplier(supplier);
      if (response.length === 0) return null;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addDeviceToOrder(idOrder, idDevice) {
    try {
      const order = await this.dao.getById(idOrder);
      if (!order) return null;
      const device = await this.dao.getById(idDevice);
      if (!device) return null;
      return await this.dao.addDeviceToOrder(idOrder, idDevice);
    } catch (error) {}
  }
}
