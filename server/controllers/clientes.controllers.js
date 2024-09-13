import Clientes from "../models/clientes.models.js";

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
    try {
        const customer = new Clientes(req.body);
        await customer.save();
        res.status(201).json(customer);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const customers = await Clientes.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

// Obtener un cliente por su ID
const obtenerClientePorId = async (req, res) => {
    try {
        const customer = await Clientes.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.status(200).json(customer);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


// Actualizar un cliente por su ID
const actualizarClientePorId = async (req, res) => {
    try {
        const customer = await Clientes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.status(200).json(customer);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

// Eliminar un cliente por su ID
const eliminarClientePorId = async (req, res) => {
    try {
        const customer = await Clientes.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.status(200).json({ message: 'Cliente eliminado correctamente' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export { crearCliente, obtenerClientes, obtenerClientePorId, actualizarClientePorId, eliminarClientePorId };
