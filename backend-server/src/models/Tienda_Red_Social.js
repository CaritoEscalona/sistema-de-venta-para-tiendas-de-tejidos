import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Tienda_Red_Social = sequelize.define("Tienda_Red_Socials", {
  id_tienda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Tienda",
      key: "id",
    },
  },
  id_red_social: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Red_Social",
      key: "id",
    },
  },
  enlace_perfil: {
    type: DataTypes.STRING(255),
  },
});