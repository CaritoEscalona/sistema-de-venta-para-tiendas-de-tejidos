import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Producto } from "./Producto.js";

export const Categoria = sequelize.define("Categoria", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  img_url: {
    type: DataTypes.STRING(255),
  }
});
