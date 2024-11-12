import { Schema, model, Types } from "mongoose";

const SecretariatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  printers: [
    {
      type: Types.ObjectId,
      ref: "devices",
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
