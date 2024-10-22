import { Schema, model, Types } from "mongoose";

const OrderFormSchema = new Schema({
  devices: {
    type: [
      {
        device: {
          type: Types.ObjectId,
          ref: "Devices",
          required: true,
        },
        secretariat: {
          type: Types.ObjectId,
          ref: "Secretariat",
          default: null
        },
        placementDate: {
          type: Date,
          default: null
        },
      },
    ],
    default: [],
  },
  supplier: {
    type: Types.ObjectId,
    ref: "Proovedor",
    required: true,
  },
  date: {
    type: Date,
  },
});

export const OrderFormModel = model("order_form", OrderFormSchema);
