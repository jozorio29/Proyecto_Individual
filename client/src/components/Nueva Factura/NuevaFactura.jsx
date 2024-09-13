import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaUserPlus, FaPrint, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NuevaFactura.module.css";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const NuevaFactura = () => {
  const [facturas, setFacturas] = useState([]);
  const [formData, setFormData] = useState({
    cliente: "",
    telefono: "",
    email: "",
    vendedor: "",
    fecha: "",
    pago: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFacturas([...facturas, formData]);
    setFormData({
      cliente: "",
      telefono: "",
      email: "",
      vendedor: "",
      fecha: "",
      pago: "",
    });
  };

  const handleDelete = (index) => {
    setFacturas(facturas.filter((_, i) => i !== index));
  };

  const handlePrint = (factura) => {
    return () => {
      const printWindow = window.open("", "", "height=600,width=800");
      const content = `
        <html>
          <head>
            <title>Ticket</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .ticket { border: 1px solid #000; padding: 10px; width: 300px; }
              .ticket h2 { text-align: center; margin: 0; }
              .ticket div { margin-bottom: 10px; }
              .ticket strong { display: inline-block; width: 100px; }
              .center-text { text-align: center; }
              .bold-line { border-bottom: 2px dashed #000; margin: 10px 0; }
              .header { text-align: center; font-weight: bold; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="header">*****************************************</div>
              <div class="center-text">DEL HORNO PIZZA & BIRRA</div>
              <div class="center-text">HOJA DE PEDIDO</div>
              <div class="header">*****************************************</div>
              <div><strong>PEDIDO Nº :</strong> </div>
              <div class="bold-line"></div>
              <div><strong>FECHA PED:</strong> ${factura.fecha}</div>
              <div><strong>FECHA IMP:</strong> ${new Date().toLocaleDateString()}</div>
              <div><strong>RAZON SOC. :</strong> </div>
              <div><strong>RUC NRO. :</strong> </div>
              <div class="bold-line"></div>
              <div><strong>PRODUCTOS:</strong></div>
              <div class="bold-line"></div>
              <div>
                <strong>Cliente:</strong> ${factura.cliente} <br />
                <strong>Teléfono:</strong> ${factura.telefono} <br />
                <strong>Email:</strong> ${factura.email} <br />
                <strong>Vendedor:</strong> ${factura.vendedor} <br />
                <strong>Pago:</strong> ${factura.pago}
              </div>
              <div class="bold-line"></div>
              <div><strong>TOTAL GLOBAL :</strong> </div>
              <div class="bold-line"></div>
              <div><strong>OPERADOR:</strong> ${factura.vendedor}</div>
            </div>
          </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="container mt-4">
      <div className={styles.container}>
        <div className={styles.header}>
          <FontAwesomeIcon icon={faPrint} className={styles.icon} />
          <h2>Nueva Factura</h2>
        </div>
        <div className="p-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group controlId="cliente">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="telefono">
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese el email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={4}>
                <Form.Group controlId="vendedor">
                  <Form.Label>Vendedor:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del vendedor"
                    value={formData.vendedor}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="pago">
                  <Form.Label>Pago:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el método de pago"
                    value={formData.pago}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <Button
                variant="primary"
                type="submit"
                className="d-flex align-items-center"
              >
                <FaUserPlus style={{ marginRight: "10px" }} /> Agregar Nuevo
                Cliente
              </Button>
            </div>
          </Form>

          <div className="mt-4">
            <h3>Lista de Facturas</h3>
            {facturas.length > 0 ? (
              <ul className="list-group">
                {facturas.map((factura, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>Cliente:</strong> {factura.cliente} <br />
                      <strong>Teléfono:</strong> {factura.telefono} <br />
                      <strong>Email:</strong> {factura.email} <br />
                      <strong>Vendedor:</strong> {factura.vendedor} <br />
                      <strong>Fecha:</strong> {factura.fecha} <br />
                      <strong>Pago:</strong> {factura.pago}
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                        size="sm"
                        className="d-flex align-items-center me-2" // Clase "me-2" para agregar margen entre los botones
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant="success"
                        className="d-flex align-items-center"
                        onClick={handlePrint(factura)} // Cambio aquí
                      >
                        <FaPrint style={{ marginRight: "10px" }} /> Imprimir
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay facturas registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaFactura;
