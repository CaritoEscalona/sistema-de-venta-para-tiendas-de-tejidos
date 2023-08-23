import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    getPagoUsuarioAuthenticado,
    sendBoleta
} from '../controllers/pagoController.js';

const router = Router();

router.post("/pagoUsuario", authMiddleware, getPagoUsuarioAuthenticado);
router.post("/sendBoleta", authMiddleware, sendBoleta);

export default router;