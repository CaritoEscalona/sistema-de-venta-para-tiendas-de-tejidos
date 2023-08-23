import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario.js';
import { Rol } from '../models/Rol.js';
import nodemailer from 'nodemailer';
import { Tienda } from '../models/Tienda.js';

// Configurar el transporter (proveedor de servicios de correo)
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

export const register = async (req, res) => {
  // Verificar si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, apellido, rut, correo, pass, id_rol } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);

    // Guardar el usuario en la base de datos
    const newUser = await Usuario.create({
      nombre,
      apellido,
      rut,
      correo,
      pass: hashedPass,
      id_rol,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req, res) => {
  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, pass } = req.body;

  try {
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Verificar si la contraseña coincide
    const isMatch = await bcrypt.compare(pass, usuario.pass);
    if (!isMatch) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Obtener rol del usuario
    const rol = await Rol.findByPk(usuario.id_rol);

    // Obtener tienda del usuario
    let tienda = await Tienda.findOne({ where: { id_usuario: usuario.id } });
    if (tienda == null) {
      tienda = { id: -1 };
    }

    // Crear y firmar el token JWT con duración de 12 horas (pasado ese tiempo debe re-logear)
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: rol.nombre,
      id_tienda: tienda.id,
      forgottenPassword: false
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7h" });

    // Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const loginWithMail = async (req, res) => {
  // Verificar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const correo = req.body.correo;

  try {
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    // Obtener rol del usuario
    const rol = await Rol.findByPk(usuario.id_rol);

    // Obtener tienda del usuario
    let tienda = await Tienda.findOne({ where: { id_usuario: usuario.id } });
    if (tienda == null) {
      tienda = { id: -1 };
    }

    // Crear y firmar el token JWT con duración de 12 horas (pasado ese tiempo debe re-logear)
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: rol.nombre,
      id_tienda: tienda.id,
      forgottenPassword: true
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15min" });

    // Enviar el token al cliente
    res.BareerToken = token;
    const urlLoged = req.body.urlLoged;
    const mensajeDeEnvio = `
    ¡Hola ${usuario.nombre}!

Te informamos que alguien ha solicitado un cambio de contraseña para el Sistema de Tiendas de Tejidos.

Esperamos que durante los próximos 15 minutos puedas recuperar tu cuenta ingresando en el siguiente enlace:
http://${urlLoged}/${res.BareerToken}

Pasados los 15 minutos, debes generar otro enlace.

Si no pediste un cambio de contraseña, lamentamos cualquier inconveniente que esto haya podido causar.

¡Deseamos que tengas un excelente día!

Atentamente,
El Equipo del Sistema de Tiendas de Tejidos.

  `;

    const mailOptions = {
      from: process.env.MAIL_USER, // Correo del sistema
      to: usuario.correo, // Correo de la tienda
      subject: '¡Sistema Tiendas de Tejidos! - ¿Olvidaste tu contraseña?',
      text: mensajeDeEnvio
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Error al enviar correo" });
      } else {
        console.log('Correo enviado: ' + info.response);
        res.status(200).json({ message: 'Correo enviado correctamente' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const usuario = await Usuario.findByPk(req.user.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(oldPassword, usuario.pass);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    usuario.pass = passwordHash;

    await usuario.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

export const changeForgottenPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { newPassword } = req.body;

  try {
    const usuario = await Usuario.findByPk(req.user.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    usuario.pass = passwordHash;

    await usuario.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};
