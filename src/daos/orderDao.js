import MongoDao from "./mongoDao.js";
import { OrderModel } from "./models/orderModel.js";

export default class OrderDao extends MongoDao {
  constructor() {
    super(OrderModel);
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("dispositivos.dispositivo");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBySupplier(supplier) {
    try {
      return this.model.find({ supplier });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addDeviceToOrder(idOrder, idDevice) {
    try {
      const order = await this.getById(idOrder);
      order.devices.push({ device: idDevice });
      await order.save();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
