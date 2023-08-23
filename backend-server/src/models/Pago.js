import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Carrito } from "./Carrito.js";

export const Pago = sequelize.define("Pago", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  id_mercadoPago: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATE,
  },
});
