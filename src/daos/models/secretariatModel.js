import { Schema, model, Types } from "mongoose";

const SecretariatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  printers: [
    {
      printer: {
        type: Types.ObjectId,
        ref: "devices",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orders: [
    {
      type: Types.ObjectId,
      ref: "orders",
    },
  ],
});

export const SecretariatModel = model("secretariat", SecretariatSchema);
