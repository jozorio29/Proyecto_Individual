import express from 'express';
import { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta, agregarProductoACliente } from '../controllers/ventas.controllers.js';
import { actualizarClientePorId, crearCliente, obtenerClientePorId, eliminarClientePorId, obtenerClientes } from '../controllers/clientes.controllers.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/producto.controllers.js';

const router = express.Router();


// ventas
router.get('/ventas', obtenerVentas);
router.post('/ventas', crearVenta);
router.put('/ventas/:id', actualizarVenta);
router.put('/ventas-agregar/:id', agregarProductoACliente);
router.delete('/ventas/:id', eliminarVenta);



// Clientes 
router.post('/clientes', crearCliente)   
router.get('/clientes', obtenerClientes);
router.get('/clientes/:id', obtenerClientePorId);
router.put('/clientes/:id', actualizarClientePorId);
router.delete('/clientes/:id', eliminarClientePorId);


// Productos 
router.post('/productos', createProduct);  
router.get('/productos', getProducts);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

export default router;