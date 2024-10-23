import { Schema, model, Types } from "mongoose";

const StockSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    ref: "devices",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  placedItems: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const StockModel = model("stocks", StockSchema);
