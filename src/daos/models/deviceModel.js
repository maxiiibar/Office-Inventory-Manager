import { Schema, model, Types } from "mongoose";

const DevicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  compatiblePrinters: {
    type: [
      {
        type: Types.ObjectId,
        ref: "printer",
      },
    ],
    default: [],
  },

  compatibleToners: {
    type: [
      {
        type: Types.ObjectId,
        ref: "toner",
      },
    ],
    default: [],
  },

  type: {
    type: String,
    enum: [
      "toner",
      "notebook",
      "teclado",
      "mouse",
      "impresora",
      "cable",
      "proyector",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const DeviceModel = model("devices", DevicesSchema);
