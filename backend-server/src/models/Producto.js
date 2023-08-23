import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Carrito } from "./Carrito.js";
import { Categoria } from "./Categoria.js";
import { Tienda } from "./Tienda.js";

export const Producto = sequelize.define("Producto", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sku: {
    type: DataTypes.STRING(255),
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  descripcion: {
    type: DataTypes.STRING(255),
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  img_url: {
    type: DataTypes.STRING(255),
  }
});
