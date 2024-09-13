import React, { useEffect, useState } from "react";
import VentasForm from "./components/Formulario de Ventas/FormularioDeVentas";
import VentasLista from "./components/Lista de Ventas/ListaDeVentas";
import BarraDeNavegacion from "./components/Nav/BarraDeNavegacion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NuevaFactura from "./components/Nueva Factura/NuevaFactura";
import axios from "axios";
import ClienteForm from "./components/Clientes/ClienteForm";
import ClientesLista from "./components/Clientes/ClientesLista";
import ProductosMantenedor from "./components/Productos/ProductosMantenedor";
import { ProductoProvider } from "./components/Productos/ProductoProvider";

const App = () => {
  const [sales, setSales] = useState([]);

  const fetchVentas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/ventas");
      const data = response.data;
      setSales(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, [sales]);

  const handleDeleteSale = (saleId) => {
    setSales((prevSales) => prevSales.filter((sale) => sale._id !== saleId));
  };

  return (
    <BrowserRouter>
      <BarraDeNavegacion />
      <div className="container">
        <Routes>
          <Route path="/ventas-form" element={<VentasForm />} />
          <Route
            path="/ventas-lista"
            element={
              <ProductoProvider>
                <VentasLista sales={sales} onDeleteSale={handleDeleteSale} />
              </ProductoProvider>
            }
          />
          <Route path="/factura" element={<NuevaFactura />} />
          <Route path="/clientes" element={<ClientesLista />} />
          <Route path="/clientes/agregar" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />
          <Route path="/productos" element={<ProductosMantenedor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
