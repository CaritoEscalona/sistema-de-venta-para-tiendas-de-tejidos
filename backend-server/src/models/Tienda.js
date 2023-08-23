import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Usuario } from "./Usuario.js";
import { Producto } from "./Producto.js";
import { Red_Social } from "./Red_Social.js";

export const Tienda = sequelize.define("Tienda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  descripcion: {
    type: DataTypes.STRING(255),
  },
  correo: {
    type: DataTypes.STRING(255),
  },
  img_url: {
    type: DataTypes.STRING(255),
  }
});
