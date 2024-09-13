import React, { useState } from 'react';
import ProductoForm from './ProductoForm';
import ProductoLista from './ProductoLista';
import { ProductoProvider } from './ProductoProvider';

const ProductosMantenedor = () => {
  const [productoActual, setProductoActual] = useState(null);

  const handleEdit = (producto) => {
    setProductoActual(producto);
  };

  const handleClear = () => {
    setProductoActual(null);
  };

  return (
    <ProductoProvider>
      <div className="container mt-4">
        <h2>Productos</h2>
        <ProductoForm productoActual={productoActual} onClear={handleClear} />
        <ProductoLista onEdit={handleEdit} />
      </div>
    </ProductoProvider>
  );
};

export default ProductosMantenedor;
