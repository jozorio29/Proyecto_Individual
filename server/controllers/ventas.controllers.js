import Ventas from "../models/ventas.models.js";

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Ventas.find();
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva venta
const crearVenta = async (req, res) => {
  const venta = new Ventas(req.body);
  try {
    const nuevaVenta = await venta.save();
    res.status(201).json(nuevaVenta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar una venta
const actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await Ventas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(ventaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una venta
const eliminarVenta = async (req, res) => {
  try {
    await Ventas.findByIdAndDelete(req.params.id);
    res.json({ message: "Venta eliminada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const agregarProductoACliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { additionalProduct } = req.body;

    // Encuentra la venta por su ID y añade el nuevo producto al array de productos adicionales
    const venta = await Ventas.findByIdAndUpdate(
      id,
      { $push: { additionalProducts: additionalProduct } },
      { new: true }
    );

    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la venta" });
  }
};


export { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta, agregarProductoACliente };