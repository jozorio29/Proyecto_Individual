import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProductoContext } from './ProductoProvider';
import axios from 'axios';


const ProductoLista = ({ onEdit }) => {
  const { productos, setProductos } = useContext(ProductoContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/productos/${id}`);
      setProductos(productos.filter((producto) => producto._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Tamaño</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto._id}>
            <td>{producto.name}</td>
            <td>{new Intl.NumberFormat('es-ES').format(producto.price)} Gs</td>
            <td>{producto.size}</td>
            <td>
              <Button variant="" className="me-2" onClick={() => onEdit(producto)}>
                <FontAwesomeIcon icon={faEdit } />
              </Button>
              <Button variant="" onClick={() => handleDelete(producto._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductoLista;
