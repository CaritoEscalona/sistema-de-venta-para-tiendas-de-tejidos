import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Rol } from "./Rol.js";

export const Permiso = sequelize.define("Permiso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
});
