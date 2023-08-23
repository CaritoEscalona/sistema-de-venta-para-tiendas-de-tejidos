import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Carrito_Producto = sequelize.define("Carrito_Productos", {
  id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Carrito",
      key: "id",
    },
  },
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Producto",
      key: "id",
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

