import React, { useState, useEffect, useContext } from "react";
import { Card, Table, Button, ListGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ProductoContext } from "../Productos/ProductoProvider";

const VentasLista = ({ sales, onDeleteSale }) => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const { productos } = useContext(ProductoContext);

  useEffect(() => {
    if (selectedCustomer) {
      const total = filteredSales.reduce((acc, sale) => {
        let price = 0;

        // Obtener el precio de flavor1
        const flavor1Data = productos.find((p) => p.name === sale.flavor1);
        const flavor1Price = flavor1Data ? flavor1Data.price : 0;

        // Obtener el precio de flavor2 (si existe)
        const flavor2Data = productos.find((p) => p.name === sale.flavor2);
        const flavor2Price = flavor2Data ? flavor2Data.price : 0;

        // Obtener el precio de sandwichType (si existe)
        const sandwichTypeData = productos.find(
          (p) => p.name === sale.sandwichType
        );
        const sandwichTypePrice = sandwichTypeData ? sandwichTypeData.price : 0;

        // Si ambos sabores están presentes, sumar y dividir por 2
        if (sale.flavor1 && sale.flavor2) {
          price = (flavor1Price + flavor2Price) / 2;
        } else if (sale.flavor1) {
          price = flavor1Price; // Si solo se selecciona flavor1, tomar su precio
        }

        // Si hay un tipo de sandwich seleccionado, agregar su precio al total
        if (sale.sandwichType) {
          price += sandwichTypePrice;
        }

        // Si hay un tipo de bebida, agregar su precio al total
        if (sale.drinkType) {
          const drinkTypeData = productos.find(
            (p) => p.name === sale.drinkType
          );
          const drinkTypePrice = drinkTypeData ? drinkTypeData.price : 0;
          price += drinkTypePrice;
        }

        return acc + sale.quantity * price;
      }, 0);

      setTotalGlobal(total);
    }
  }, [selectedCustomer, sales, productos]);

  const handleDeleteClick = async (saleId) => {
    try {
      await axios.delete(`http://localhost:8000/api/ventas/${saleId}`);
      onDeleteSale(saleId);
    } catch (error) {
      console.error(
        "Error deleting sale:",
        error.response?.data || error.message
      );
    }
  };

  const handleAddProductClick = (sale) => {
    navigate("/ventas-form", { state: { existingSale: sale } });
  };

  const handleCustomerClick = (customerName) => {
    setSelectedCustomer(customerName);
  };

  const filteredSales = selectedCustomer
    ? sales.filter((sale) => sale.customerName === selectedCustomer)
    : [];

  return (
    <div className="d-flex">
      <div className="w-25">
        <h2 className="mt-3">Clientes</h2>
        <Card>
          <ListGroup variant="flush">
            {Array.from(new Set(sales.map((sale) => sale.customerName))).map(
              (customerName) => (
                <ListGroup.Item
                  key={customerName}
                  action
                  onClick={() => handleCustomerClick(customerName)}
                  active={selectedCustomer === customerName}
                >
                  {customerName}
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        </Card>
      </div>

      <div className="w-75 ms-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2></h2>
          <Link to="/ventas-form" className="btn btn-primary mt-2">
            Agregar Producto
          </Link>
        </div>
        {selectedCustomer ? (
          <Card>
            <Card.Header>
              <strong>Cliente:</strong> {selectedCustomer}
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Detalle</th>
                    <th>Subtotal</th> {/* Nueva columna para Subtotal */}
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => {
                    // Obtener el precio de flavor1
                    const flavor1Data = productos.find(
                      (p) => p.name === sale.flavor1
                    );
                    const flavor1Price = flavor1Data ? flavor1Data.price : 0;

                    // Obtener el precio de flavor2 (si existe)
                    const flavor2Data = productos.find(
                      (p) => p.name === sale.flavor2
                    );
                    const flavor2Price = flavor2Data ? flavor2Data.price : 0;

                    // Obtener el precio de sandwichType (si existe)
                    const sandwichTypeData = productos.find(
                      (p) => p.name === sale.sandwichType
                    );
                    const sandwichTypePrice = sandwichTypeData
                      ? sandwichTypeData.price
                      : 0;

                    // Calcular el precio final basado en los sabores seleccionados
                    let price = 0;
                    if (sale.flavor1 && sale.flavor2) {
                      // Si ambos sabores están presentes, sumar y dividir por 2
                      price = (flavor1Price + flavor2Price) / 2;
                    } else if (sale.flavor1) {
                      // Si solo se selecciona flavor1, tomar su precio
                      price = flavor1Price;
                    }

                    // Si hay un tipo de sandwich seleccionado, agregar su precio al total
                    if (sale.sandwichType) {
                      price += sandwichTypePrice;
                    }

                    // Si hay un tipo de bebida seleccionado, agregar su precio al total
                    if (sale.drinkType) {
                      const drinkTypeData = productos.find(
                        (p) => p.name === sale.drinkType
                      );
                      const drinkTypePrice = drinkTypeData
                        ? drinkTypeData.price
                        : 0;
                      price += drinkTypePrice;
                    }

                    // Calcular el subtotal
                    const subtotal = sale.quantity * price;

                    return (
                      <tr key={sale._id}>
                        <td>{sale.quantity}</td>
                        <td>{sale.product}</td>
                        <td>
                          {sale.flavor1 && <div>{sale.flavor1}</div>}
                          {sale.flavor2 && <div>{sale.flavor2}</div>}
                          {sale.sandwichType && <div>{sale.sandwichType}</div>}
                          {sale.drinkType && <div>{sale.drinkType}</div>}
                          {sale.drinkOption && <div>{sale.drinkOption}</div>}
                        </td>
                        <td>
                          {subtotal.toLocaleString("es-ES", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}{" "}
                          Gs
                        </td>
                        <td>
                          <div className="d-flex">
                            <Button
                              variant=""
                              onClick={() => handleDeleteClick(sale._id)}
                              className="me-2"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button
                              variant=""
                              onClick={() => handleAddProductClick(sale)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <td>
                        {totalGlobal.toLocaleString("es-ES", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{" "}
                        Gs
                      </td>
                    </td>
                    <td></td>{" "}
                    {/* Columna vacía para alinear con las acciones */}
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <p>Seleccione un cliente para ver sus ventas.</p>
        )}
      </div>
    </div>
  );
};

export default VentasLista;
