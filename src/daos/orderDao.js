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

  async changeToInStock(idOrder) {
    try {
      return await this.update(idOrder, { status: "en stock" });
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeToPlaced(idOrder) {
    try {
      return await this.update(idOrder, { status: "colocado" });
    } catch (error) {
      throw new Error(error);
    }
  }

  async placeDevice(idOrder, idDevice, idSecretariat){
    try {
      const order = await this.getById(idOrder);
      for (let index = 0; index < order.devices.length; index++) {
        if(order.devices[index].device.equals(idDevice)){
          order.devices[index].secretariat = idSecretariat;
          order.devices[index].placementDate = Date.now();
        }
      }
      await order.save();
      return order
    } catch (error) {
      throw new Error(error);
    }
  }
}
