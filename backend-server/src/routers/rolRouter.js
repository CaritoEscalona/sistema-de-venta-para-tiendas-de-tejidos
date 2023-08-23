import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createRols, updateRol, addPermisoToRol } from "../controllers/rolController.js";

const router = Router();

router.post("/rol", authMiddleware, createRols);
router.put("/rol", authMiddleware, updateRol);
router.post("/rol-permiso", authMiddleware, addPermisoToRol);

export default router;
