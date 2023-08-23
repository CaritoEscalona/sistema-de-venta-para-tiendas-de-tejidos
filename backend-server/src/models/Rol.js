import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Permiso } from "./Permiso.js";
import { Usuario } from "./Usuario.js";

export const Rol = sequelize.define("Rol", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
});
