import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { 
    getProductos,
    getProductoById,
    getProductosByTienda,
    getProductoByCategoria,
    getProductoByTiendaAndSku,
    createProducto,
    deleteProducto, 
    updateProducto,
    updateDisponibilidad
} from "../controllers/productoController.js";

const router = Router();

router.get("/productos", getProductos);
router.get('/productos/:id', getProductoById);
router.get("/productos/tienda/:id_tienda", getProductosByTienda);
router.get("/productos/categoria/:id_categoria", getProductoByCategoria);
router.get("/productos/tienda/:id_tienda/sku/:sku", getProductoByTiendaAndSku);
router.post("/productos", authMiddleware, createProducto);
router.put("/productos",authMiddleware, updateProducto);
router.put("/productos/disponibilidad/:id", authMiddleware, updateDisponibilidad);
router.delete("/productos/:id", authMiddleware, deleteProducto);

export default router;
