import { Carrito } from "../models/Carrito.js";
import { Carrito_Producto } from "../models/Carrito_Producto.js";
import { Producto } from "../models/Producto.js";


export const getCarritos = async (req, res) => {
    try {
        const carritos = await Carrito.findAll();
        res.status(200).json(carritos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener carritos." });
    }
}

export const getCarritoById = async (req, res) => {
    try {
        const carrito = await Carrito.findByPk(req.body.id);
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la carrito.' });
    }
};

export const getCarritoByUsuario = async (req, res) => {
    const id_usuario = req.user.id;

    try {
        const carrito = await Carrito.findOne({ where: { id_usuario } });
        if(carrito)
            res.status(200).json(carrito);
        else
            res.status(404).json({ message: "No se encontró carrito"});
    } catch (error) {
        res.status(500).json({ message: "Error al obtener carrito por usuario" });
    }
};

export const getCarritoProductos = async (req, res) => {
    try {
        // Verificar si el usuario tiene un carrito creado
        const carrito = await Carrito.findOne({ where: { id_usuario: req.user.id } });
        if (carrito) {
            const productos = await Carrito_Producto.findAll({
                where: {
                    id_carrito: carrito.id
                },
            });
            res.status(200).json(productos);
        } else {
            return res.status(400).json({ message: "El usuario no tiene un carrito creado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener carrito por usuario" });
    }
};

export const createCarrito = async (req, res) => {
    try {
        // Verificar si el usuario tiene un carrito creado
        const carrito = await Carrito.findOne({ where: { id_usuario: req.user.id } });
        if (carrito) {
            return res
                .status(400)
                .json({ message: "El usuario ya tiene un carrito creado" });
        }

        const newCarrito = await Carrito.create({
            id_usuario: req.user.id
        });

        return res.status(201).json({ newCarrito });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al asignar producto al carrito" });
    }
};

export const deleteCarritoById = async (req, res) => {
    try {
        const { id } = req.body;
        // Verificar si el carrito existe
        const carritoExistente = await Carrito.findOne({
            where: {
                id,
            },
        });

        if (!carritoExistente) {
            return res.status(404).json({ message: "Carrito no encontrada" });
        }

        // Eliminar el carrito
        await Carrito.destroy({
            where: {
                id,
            },
        });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteCarritoByUser = async (req, res) => {
    try {
        // Verificar si el carrito existe
        const carritoExistente = await Carrito.findOne({
            where: {
                id_usuario: req.user.id,
            },
        });

        if (!carritoExistente) {
            return res.status(404).json({ message: "Carrito no encontrada" });
        }

        // Eliminar el carrito
        await Carrito.destroy({
            where: {
                id_usuario,
            },
        });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const addProductToCarrito = async (req, res) => {
    try {
        const { id_producto, cantidad } = req.body;

        const amount = cantidad != null ? cantidad : 1;

        // Obtener el id del carrito
        const carrito = await Carrito.findOne({ where: { id_usuario: req.user.id, } });

        // Verificar si el producto existe
        const producto = await Producto.findOne({
            where: {
                id: id_producto,
            },
        });

        if (carrito && producto) {
            // Verificar si ya hay dependencias del producto en el carrito.
            const existe = await Carrito_Producto.findOne({
                where: {
                    id_carrito: carrito.id,
                    id_producto: producto.id
                },
            });
            if (existe) {
                // Sumarle uno al atributo cantidad
                existe.cantidad += amount;

                // Si la cantidad sumada es 0 o menor, se eliminda del carrito el producto.
                if (existe.cantidad <= 0) {
                    await existe.destroy();
                    res.status(200).json({ producto_eliminado: true });
                } else {
                    await existe.save();
                    res.status(200).json({ carrito_producto: existe });
                }
            } else {
                // Si la cantidad es menor o igual a 0, crearlo con 1
                const cantidad_positiva = amount > 0 ? amount : 1
                const carrito_producto = await Carrito_Producto.create({
                    id_carrito: carrito.id,
                    id_producto: producto.id,
                    cantidad: cantidad_positiva,
                });
                res.status(200).json({ carrito_producto });
            }
        } else {
            // Carrito o Producto no existen
            res.status(404).json({ message: 'Carrito o Producto no existe' });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al asignar producto al carrito" });
    }
};

