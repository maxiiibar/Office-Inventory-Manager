import MongoDao from "./mongoDao.js";
import { OrderFormModel } from "./models/OrderFormModel.js";

export default class OrderFormDao extends MongoDao {
  constructor() {
    super(OrderFormModel);
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

  async addDeviceToOrderForm(idOrder, idDevice ){
    try {
      const orderForm = await this.getById(idOrder);
      orderForm.devices.push({device: idDevice});
      await orderForm.save();
      return orderForm;
    } catch (error) {
      throw new Error(error);
    }
  }
}
