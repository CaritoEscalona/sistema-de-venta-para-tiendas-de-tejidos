import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Rol } from "./Rol.js";
import { Carrito } from "./Carrito.js";
import { Tienda } from "./Tienda.js";

export const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
  apellido: {
    type: DataTypes.STRING(255),
  },
  rut: {
    type: DataTypes.STRING(12),
    unique: true
  },
  correo: {
    type: DataTypes.STRING(255),
  },
  pass: {
    type: DataTypes.STRING(255),
  },
});
