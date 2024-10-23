import { Schema, model, Types } from "mongoose";

const SecretariaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  impresoras: [
    {
      type: Types.ObjectId,
      ref: "Impresora",
    },
  ],
  notasDePedido: [
    {
      type: Types.ObjectId,
      ref: "NotaPedido",
    },
  ],
});

export const SecretariaModel = model("Secretaria", SecretariaSchema);
