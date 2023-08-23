import { Permiso } from "../models/Permiso.js";

export const createPermisos = async (req, res) => {
    try {
        const { permisos } = req.body;
        if (!Array.isArray(permisos)) {
            return res.status(400).json({ error: "Se esperaba un arreglo de permisos" });
        }
        const newPermisos = await Promise.all(
            permisos.map(
                permiso => Permiso.create({nombre: permiso.nombre})
            )
        );
        res.status(200).json({ newPermisos });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al crear los permisos" });
    }
};

export const updatePermiso = async (req, res) => {
    try {
        const { nombre } = req.body;
        const idPermiso = req.params.id;
        const permiso = await Permiso.update(nombre, {
            where: { id: idPermiso }
        });
        res.status(200).json({ permiso });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al actulizar el permiso" });
    }
};
