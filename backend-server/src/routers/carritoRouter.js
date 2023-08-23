import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getCarritos,
    getCarritoById,
    getCarritoByUsuario,
    getCarritoProductos,
    createCarrito,
    addProductToCarrito,
    deleteCarritoById,
    deleteCarritoByUser
} from "../controllers/carritoController.js";

const router = Router();

router.get("/carritos", getCarritos);
router.get('/carritos/id', getCarritoById);
router.get("/carritos/usuario", authMiddleware, getCarritoByUsuario);
router.get("/carritos/productos", authMiddleware, getCarritoProductos);
router.post("/carritos", authMiddleware, createCarrito);
router.put("/carritos", authMiddleware, addProductToCarrito);
router.delete("/carritos", authMiddleware, deleteCarritoById);
router.delete("/carritos/usuario", deleteCarritoByUser);

export default router;
