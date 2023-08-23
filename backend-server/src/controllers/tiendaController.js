import nodemailer from 'nodemailer';
import { Tienda } from "../models/Tienda.js";

// Configurar el transporter (proveedor de servicios de correo)
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

export const sendMailtoTienda = async (req, res) => {
  const { nombreContacto, correoContacto, mensajeContacto, idTienda } = req.body;

  const tienda = await Tienda.findByPk(idTienda);

  const mensajeDeEnvio = `
    ¡Hola ${tienda.nombre}!

    Te informamos que ${nombreContacto} ha enviado un mensaje para ti:
    
    ***INICIO DEL MENSAJE***
    ${mensajeContacto}
    ***TERMINO DEL MENSAJE***
    Esperamos que puedas ponerte en contacto con la persona que envió el
    mensaje a través del correo electrónico: ${correoContacto}.
    Si tienes algún problema con el mensaje recibido, por favor,
    avísanos enviando un correo electrónico a ${process.env.MAIL_USER}.
    Lamentamos cualquier inconveniente que esto haya podido causar.
    ¡Deseamos que tengas un excelente día!
    Atentamente,
    El Equipo del Sistema de Tiendas de Tejidos.
  `;

  const mailOptions = {
    from: process.env.MAIL_USER, // Correo del sistema
    to: tienda.correo, // Correo de la tienda
    cc: correoContacto, // Correo del contacto
    subject: '¡Sistema Tiendas de Tejidos! - ¡Tienes un Nuevo Pedido!',
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
}

export const getTiendas = async (req, res) => {
  try {
    const tiendas = await Tienda.findAll();
    res.status(200).json(tiendas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tiendas." });
  }
};

export const getTiendaById = async (req, res) => {
  try {
    const tienda = await Tienda.findByPk(req.params.id);
    res.json(tienda);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tienda.' });
  }
};

export const getTiendaByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const tienda = await Tienda.findOne({ where: { id_usuario } });
    res.status(200).json(tienda);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tienda por usuario" });
  }
};

export const createTienda = async (req, res) => {
  try {
    const id_user = req.user.id;
    const { nombre, descripcion, correo, img_url } = req.body;
    // Verificar si el usuario tiene una tienda creada
    const tienda = await Tienda.findOne({
      where: {
        id_usuario: id_user,
      },
    });

    if (tienda) {
      return res
        .status(400)
        .json({ message: "El usuario ya tiene una tienda creada" });
    }

    const newTienda = await Tienda.create({
      nombre,
      descripcion,
      correo,
      img_url,
      id_usuario: id_user,
    });

    return res.status(201).json({ newTienda });
  } catch (error) {
    return res.status(400).json({});
  }
};

export const deleteTienda = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si la tienda existe
    const tiendaExistente = await Tienda.findOne({
      where: {
        id,
      },
    });

    if (!tiendaExistente) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    // Eliminar la tienda
    await Tienda.destroy({
      where: {
        id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTienda = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, correo, img_url } = req.body;

    // Verificar si el usuario tiene una tienda creada
    const tienda = await Tienda.findOne({
      where: {
        id_usuario: req.user.id,
      },
    });

    if (!tienda) {
      return res.status(400).json({
        message: "No se encontró una tienda asociada a este usuario.",
      });
    }

    // Verificar si la tienda existe
    const tiendaExistente = await Tienda.findOne({
      where: {
        id,
      },
    });

    if (!tiendaExistente) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    // Verificar si la tienda pertenece al usuario autenticado
    if (tiendaExistente.id_usuario !== req.user.id) {
      return res.status(401).json({
        message: "No tienes permisos para actualizar esta tienda",
      });
    }
    await tiendaExistente.update({
      nombre,
      descripcion,
      correo,
      img_url,
    });

    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
