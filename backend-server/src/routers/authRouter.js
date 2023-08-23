import { Router } from "express";
import {
    register,
    login,
    loginWithMail,
    changePassword,
    changeForgottenPassword } from "../controllers/authController.js";
import { 
    registerValidation, 
    loginValidation, 
    changePasswordValidation,
    changeForgottenPasswordValidation } from "../middlewares/validators.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/auth/register", registerValidation, register);
router.post("/auth/login", loginValidation, login);
router.put("/auth/changePassword", authMiddleware, changePasswordValidation, changePassword);
router.put("/auth/changeForgottenPassword", authMiddleware, changeForgottenPasswordValidation, changeForgottenPassword);
router.post("/auth/forgetPw", loginWithMail)

export default router;
