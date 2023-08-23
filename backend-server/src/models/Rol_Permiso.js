import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Rol_Permiso = sequelize.define("Rol_Permisos", {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Rol",
      key: "id",
    },
  },
  id_permiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Permiso",
      key: "id",
    },
  },
});
