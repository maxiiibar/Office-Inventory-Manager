import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  devices: {
    type: [
      {
        device: {
          type: Types.ObjectId,
          ref: "devices",
          required: true,
        },
        secretariat: {
          type: Types.ObjectId,
          ref: "secretariats",
          default: null,
        },
        placementDate: {
          type: Date,
          default: null,
        },
      },
    ],
    default: [],
  },
  supplier: {
    type: Types.ObjectId,
    ref: "suppliers",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Types.ObjectId,
    ref: "users",
    required: true,
  },
  status: {
    type: String,
    enum: ["pendiente", "en stock", "colocado"],
    default: "pendiente",
  },
});

export const OrderModel = model("orders", OrderSchema);
