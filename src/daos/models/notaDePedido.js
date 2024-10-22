import { Schema, model, Types } from "mongoose";

const NotaPedidoSchema = new Schema({
  dispositivos: [
    {
      dipositivo: {
        type: Types.ObjectId,
        ref: "Dispositivo",
        required: true
      },
      secretaria: {
        type: Types.ObjectId,
        ref: "Secretaria",
        required: true
      },
      fechaColocación: {
        type: Date,
      }
    },
  ],
  proovedor: {
    type: Types.ObjectId,
    ref: "Proovedor",
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

export const NotaPedidoModel = model("NotaPedido", NotaPedidoSchema);
