import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getCategorias,
    getCategoriaById,
    createCategoria,
    deleteCategoria,
} from '../controllers/categoriaController.js';

const router = Router();

router.get("/categorias", getCategorias);
router.get('/categorias/:id', getCategoriaById);
router.post("/categorias", createCategoria);
// router.put("/categorias",updateCategoria);
router.delete("/categorias/:id", deleteCategoria);

export default router;