import { Categoria } from "../models/Categoria.js";

export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener categorias." });
    }
}

export const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la categoria.' });
    }
};

export const createCategoria = async (req, res) => {
    try {
        const { nombre, img_url } = req.body;

        // Verificar si existe
        const categoriaExistente = await Categoria.findOne({
            where: {
                nombre
            },
        });

        if (categoriaExistente) {
            return res
                .status(400)
                .json({ message: "Ya existe una categoria con este nombre" });
        }

        const newCategoria = await Categoria.create({            
            nombre,
            img_url,
        });
        return res.status(201).json({ newCategoria });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al crear la categoria" });
    }
};

export const deleteCategoria = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si existe
      const categoriaExistente = await Categoria.findByPk(id);

      if (!categoriaExistente) {
        return res.status(404).json({ message: "Categoria no encontrada" });
      }
  
      // Eliminar categoria
      await Categoria.destroy({
        where: {
          id,
        },
      });
  
      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };