import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ProductoContext } from './ProductoProvider';

const ProductoForm = ({ productoActual, onClear }) => {
  const { productos, setProductos } = useContext(ProductoContext);
  const [producto, setProducto] = useState({ name: '', price: '', size: '' });

  useEffect(() => {
    if (productoActual) {
      setProducto(productoActual);
    } else {
      setProducto({ name: '', price: '', size: '' });
    }
  }, [productoActual]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (producto._id) {
        const response = await axios.put(`http://localhost:8000/api/productos/${producto._id}`, producto);
        setProductos(
          productos.map((p) => (p._id === producto._id ? response.data : p))
        );
      } else {
        const response = await axios.post('http://localhost:8000/api/productos', producto);
        setProductos([...productos, response.data]);
      }

      onClear();
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Producto</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="size">
        <Form.Label>Tamaño</Form.Label>
        <Form.Control as="select" name="size" value={producto.size} onChange={handleChange}>
          <option value=""></option>
          <option value="xs">xs</option>
          <option value="xl">xl</option>
        </Form.Control>
      </Form.Group>

      <Button type="submit" className="mt-3 mb-3">
        Guardar
      </Button>
    </Form>
  );
};

export default ProductoForm;
