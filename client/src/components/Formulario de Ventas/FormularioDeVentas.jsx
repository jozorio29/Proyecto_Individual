import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import styles from "./FormularioDeVentas.module.css";
import axios from "axios";

// Opciones de sabores, tipos de sandwich y bebidas
const SABORES_xs= [
  "Muzzarella xs", "Choclo xs", "Palmito xs", "Napolitana xs", "Margarita xs", "Pollo con catupiry xs",
  "Pepperoni xs", "Fugazza xs", "Cuatro Quesos xs", "Calabresa xs", "Vegetariana xs", "Jamón y Morron xs",
  "Mexicana xs", "Rúcula xs", "Chicken Alfredo xs", "Meat Lovers xs", "Pesto xs", "Toscana xs", "Carne a la Barbacoa xs", "Lomo Salteado xs"
];

const SABORES_xl= [
  "Muzzarella xl", "Choclo xl", "Palmito xl", "Napolitana xl", "Margarita xl", "Pollo con catupiry xl",
  "Pepperoni xl", "Fugazza xl", "Cuatro Quesos xl", "Calabresa xl", "Vegetariana xl", "Jamón y Morron xl",
  "Mexicana xl", "Rúcula xl", "Chicken Alfredo xl", "Meat Lovers xl", "Pesto xl", "Toscana xl", "Carne a la Barbacoa xl", "Lomo Salteado xl"
];

const SANDWICH_TYPES = [
  "Panini xs", "Panini xl", "Sanwich de Pollo", "Buffalo"
];

const DRINK_OPTIONS = {
  "Agua 500 ml": ["Con gas", "Sin gas"],
  "Gaseosa 500 ml": ["Coca Cola", "Fanta Naranja", "Sprite"],
  "Gaseosa 1 Lt": ["Coca Cola", "Fanta Naranja", "Sprite", "Guaraná"],
  "Jugo del Valle de 250 ml": ["Jugo del Valle"],
  "Cerveza": ["Bud 66", "Pilsen", "Pagagonia 730 ml"]
};

// Hook personalizado para manejar formularios
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleReset = (resetFields) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...resetFields
    }));
  };

  return { values, handleChange, handleReset };
};

const VentasForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { existingSale } = location.state || {};

  const initialValues = {
    quantity: 1,
    product: "",
    flavor1: "",
    flavor2: "",
    sandwichType: "",
    drinkType: "",
    drinkOption: "",
    paymentMethod: "",
    saleType: "",
    customerName: "",
    additionalProducts: []
  };

  const { values: sale, handleChange, handleReset } = useForm(initialValues);

  useEffect(() => {
    if (existingSale) {
      handleReset({
        ...existingSale,
        additionalProducts: existingSale.additionalProducts || []
      });
    }
  }, [existingSale, handleReset]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    if (name === "product") {
      handleReset({
        drinkType: "",
        drinkOption: ""
      });
    }
  };

  const handleDrinkTypeChange = (e) => {
    handleChange(e);
    handleReset({ drinkOption: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = sale._id ? `http://localhost:8000/api/ventas/${sale._id}` : "http://localhost:8000/api/ventas";
      const method = sale._id ? axios.put : axios.post;
      const response = await method(url, sale);
      console.log(sale._id ? "Venta actualizada:" : "Venta registrada:", response.data);
      navigate("/ventas-lista");
    } catch (error) {
      console.error("Error registrando o actualizando la venta:", error);
    }
  };

  const getFlavors = () => {
    if (sale.product === "Pizza") {
      return SABORES_xl;
    } else if (sale.product === "Mini pizza") {
      return SABORES_xs;
    }
    return [];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faFileInvoice} className={styles.icon} />
        <h3>Registrar Ventas</h3>
      </div>
      <div className="p-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formQuantity">
            <Form.Label column sm={3}>Cantidad:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                name="quantity"
                value={sale.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formProduct">
            <Form.Label column sm={3}>Producto:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="product"
                value={sale.product}
                onChange={handleProductChange}
                required
              >
                <option value="">Seleccionar producto</option>
                {["Pizza", "Mini pizza", "Bebidas", "Sandwich"].map((prod, index) => (
                  <option key={index} value={prod}>{prod}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          {(sale.product === "Pizza" || sale.product === "Mini pizza") && (
            <>
              <Form.Group as={Row} className="mb-3" controlId="formFlavor1">
                <Form.Label column sm={3}>Sabor 1:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="flavor1"
                    value={sale.flavor1}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar sabor</option>
                    {getFlavors().map((sabor, index) => (
                      <option key={index} value={sabor}>{sabor}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFlavor2">
                <Form.Label column sm={3}>Sabor 2:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="flavor2"
                    value={sale.flavor2}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar sabor</option>
                    {getFlavors().map((sabor, index) => (
                      <option key={index} value={sabor}>{sabor}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </>
          )}

          {sale.product === "Sandwich" && (
            <Form.Group as={Row} className="mb-3" controlId="formSandwichType">
              <Form.Label column sm={3}>Tipo de Sandwich:</Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="sandwichType"
                  value={sale.sandwichType}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar tipo de sandwich</option>
                  {SANDWICH_TYPES.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          )}

          {sale.product === "Bebidas" && (
            <>
              <Form.Group as={Row} className="mb-3" controlId="formDrinkType">
                <Form.Label column sm={3}>Tipo de Bebida:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="select"
                    name="drinkType"
                    value={sale.drinkType}
                    onChange={handleDrinkTypeChange}
                  >
                    <option value="">Seleccionar tipo de bebida</option>
                    {Object.keys(DRINK_OPTIONS).map((drinkType, index) => (
                      <option key={index} value={drinkType}>{drinkType}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              {sale.drinkType && (
                <Form.Group as={Row} className="mb-3" controlId="formDrinkOption">
                  <Form.Label column sm={3}>Opción de Bebida:</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="select"
                      name="drinkOption"
                      value={sale.drinkOption}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar opción</option>
                      {DRINK_OPTIONS[sale.drinkType]?.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              )}
            </>
          )}

          <Form.Group as={Row} className="mb-3" controlId="formPaymentMethod">
            <Form.Label column sm={3}>Método de Pago:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="paymentMethod"
                value={sale.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar método de pago</option>
                {["Efectivo", "Tarjeta de crédito", "Tarjeta de débito"].map((method, index) => (
                  <option key={index} value={method}>{method}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formSaleType">
            <Form.Label column sm={3}>Tipo de Venta:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="saleType"
                value={sale.saleType}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar tipo de venta</option>
                {["Venta en mostrador", "Venta por delivery"].map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formCustomerName">
            <Form.Label column sm={3}>Nombre del Cliente:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="customerName"
                value={sale.customerName}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Col sm={6}>
              <Button type="submit" className="btn btn-primary">
                {sale._id ? "Actualizar Venta" : "Registrar Venta"}
              </Button>
            </Col>
            <Col sm={6} className="text-end">
              <Button variant="secondary" onClick={() => navigate("/ventas-lista")}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default VentasForm;
