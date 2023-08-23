import { Rol } from "../models/Rol.js";
import { Rol_Permiso } from "../models/Rol_Permiso.js";

export const createRols = async (req, res) => {
    try {
        const { nameRol } = req.body;
        // Verificamos si el rol ya existe
        const existingRol = await Rol.findOne({ where: { nombre: nameRol } });
        if (existingRol) {
            // El rol ya existe
            res.status(409).json({ message: "El rol ya existe" });
        } else {
            // El rol no existe, podemos crearlo
            const newRol = await Rol.create({ nombre: nameRol })
            res.status(200).json({ newRol });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al crear los roles" });
    }
};

export const updateRol = async (req, res) => {
    try {
        const { antiguoNombre, nuevoNombre } = req.body;
        const rol = await Rol.update(nuevoNombre , {
            where: { nombre: antiguoNombre }
        });
        res.status(200).json({ rol });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al actualizar el rol" });
    }
};

export const addPermisoToRol = async (req, res) => {
    try {
        const { nameRol, namePermiso } = req.body;

        // Obtener el id de Rol y Permiso
        const rol = await Rol.findOne({ where: { nombre: nameRol } });
        const permiso = await Permiso.findOne({ where: { nombre: namePermiso } });

        if (rol && permiso) {
            const rol_permiso = await Rol_Permiso.create({
                idRol: rol.id,
                idPermiso: permiso.id
            });
            res.status(200).json({ rol_permiso }); 
        } else {
            // Rol o Permiso no existen
            res.status(404).json({ message: 'Rol o Permiso no existen' });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al asignar rol a permiso" });
    }
};
