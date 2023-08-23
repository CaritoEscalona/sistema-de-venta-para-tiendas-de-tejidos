import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Usuario } from "./Usuario.js";
import { Pago } from "./Pago.js";
import { Producto } from "./Producto.js";

export const Carrito = sequelize.define("Carrito", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
