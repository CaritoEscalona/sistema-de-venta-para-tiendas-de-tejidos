import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Tienda } from "./Tienda.js";

export const Red_Social = sequelize.define("Red_Social", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
  },
});
