import { Schema, model, Types } from "mongoose";

const TonerSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  impresorasCompatibles: [
    {
      type: Types.ObjectId,
      ref: 'Impresora',
    },
  ],
});

export const TonerModel = model('Toner', TonerSchema);
