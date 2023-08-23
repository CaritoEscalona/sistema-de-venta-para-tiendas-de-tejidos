import { Router } from "express";
import { authMiddleware, superAdminAuthMiddleware } from "../middlewares/authMiddleware.js";
import { createPermisos, updatePermiso } from "../controllers/permisoController.js";

const router = Router();

router.post("/permisos", authMiddleware, superAdminAuthMiddleware, createPermisos);
router.put("/permisos/:id", authMiddleware, superAdminAuthMiddleware, updatePermiso);

export default router;
