import { Router } from "express";
import { 
    authMiddleware,
    requireVerUsuarios,
    requireEditarUsuarios,
    requireEliminarUsuarios,
    requireAsignarRoles
} from "../middlewares/authMiddleware.js";
import {
    getUsuarios,
    getUsuarioAutenticado,
    getUsuarioById,
    deleteUsuario,
    updateUsuario,
    changeUsuarioRol
} from "../controllers/usuarioController.js";
import { register } from "../controllers/authController.js";
import { registerValidation } from "../middlewares/validators.js";

const router = Router();

router.get('/usuarios', authMiddleware, requireVerUsuarios, getUsuarios);
router.get("/me", authMiddleware, getUsuarioAutenticado);
router.get('/usuarios/:id', authMiddleware, requireVerUsuarios, getUsuarioById);
router.post('/usuarios', registerValidation, register);
router.put('/usuarios/:id', authMiddleware, requireEditarUsuarios, updateUsuario);
router.put("/usuario/:id/rol", authMiddleware, requireAsignarRoles, changeUsuarioRol);
router.delete('/usuarios/:id', authMiddleware, requireEliminarUsuarios, deleteUsuario);

export default router;
