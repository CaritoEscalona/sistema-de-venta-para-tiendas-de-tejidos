import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getTiendas,
    getTiendaById,
    getTiendaByUsuario,
    createTienda,
    deleteTienda,
    updateTienda,
    sendMailtoTienda
} from "../controllers/tiendaController.js";

const router = Router();

router.get("/tiendas", getTiendas);
router.get('/tiendas/:id', getTiendaById);
router.get("/tiendas/usuario/:id_usuario", getTiendaByUsuario);
router.post("/tiendas", authMiddleware, createTienda);
router.post("/tiendas/pedido", sendMailtoTienda)
router.put("/tiendas/:id", authMiddleware, updateTienda);
router.delete("/tiendas/:id", authMiddleware, deleteTienda);

export default router;
