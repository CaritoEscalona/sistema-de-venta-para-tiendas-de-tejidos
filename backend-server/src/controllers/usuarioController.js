import { Usuario } from "../models/Usuario.js";
import bcrypt from 'bcryptjs';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios." });
    }
};

export const getUsuarioAutenticado = async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.user.id, {
        attributes: ["id", "nombre", "apellido", "rut", "correo", "id_rol"],
      });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
}    

export const getUsuarioById = async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario.' });
    }
  };

export const deleteUsuario = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si el usuario existe
      const usuarioExistente = await Usuario.findByPk(id);

      if (!usuarioExistente) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Eliminar el usuario
      await Usuario.destroy({
        where: {
          id,
        },
      });
  
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido,rut,correo,pass,id_rol} = req.body;

        const usuarioExistente = await Usuario.findOne({
            where: {
                id,
            },
        });
        if (!usuarioExistente) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(pass, salt);

        await Usuario.update({
            rut,
            nombre,
            apellido,
            correo,
            pass:hashedPass,
            id_rol,
        }, {
            where: {
                id,
            },
        });

        return res.sendStatus(200);
    }   catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const changeUsuarioRol = async (req, res) => {
    try {
      const { id } = req.params;
      const { nameRol } = req.body;
      const usuarioExistente = await Usuario.findOne({
          where: {
              id,
          },
      });
      if (!usuarioExistente) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Obtener el id de Rol y Permiso
      const rolExistente = await Rol.findOne({ where: { nombre: nameRol } });
      if (!rolExistente) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      await Usuario.update({
          id_rol: rolExistente.id,
        }, {
          where: {
              id,
          },
      });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
};
