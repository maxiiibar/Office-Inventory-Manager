import Services from "./classServices.js";
import OrderFormDao from "../daos/OrderFormDao.js";
const orderFormDao = new OrderFormDao();

export default class NotaPedidoServices extends Services {
  constructor() {
    super(orderFormDao);
  }

  async getBySupplier(supplier) {
    try {
        const response = await this.dao.getBySupplier(supplier);
        if(response.length === 0) return null;
        return response;
    } catch (error) {
        throw new Error(error)
    }
  }
}
