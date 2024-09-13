import Producto from "../models/producto.models.js";


// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { name, price, size } = req.body;
        const newProduct = new Producto({ name, price, size });
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};


// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Producto.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

// Actualizar un producto por su ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, size } = req.body;
        const updatedProduct = await Producto.findByIdAndUpdate(
          id,
          { name, price, size },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

// Eliminar un proyecto por su ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};


export { createProduct, getProducts, updateProduct, deleteProduct }

