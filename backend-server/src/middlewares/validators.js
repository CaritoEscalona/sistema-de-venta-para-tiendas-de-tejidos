import { body } from "express-validator";

export const registerValidation = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
  body("rut").notEmpty().withMessage("El RUT es obligatorio"),
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("pass").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("id_rol").notEmpty().withMessage("El ID de rol es obligatorio"),
];

export const loginValidation = [
  body("correo").isEmail().withMessage("El correo debe ser válido"),
  body("pass").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const changePasswordValidation = [
  body("oldPassword")
    .exists()
    .withMessage("La contraseña antigua es obligatoria"),
  body("newPassword")
    .exists()
    .withMessage("La contraseña nueva es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña nueva debe tener al menos 8 caracteres"),
];

export const changeForgottenPasswordValidation = [
  body("newPassword")
    .exists()
    .withMessage("La contraseña nueva es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña nueva debe tener al menos 8 caracteres"),
];
