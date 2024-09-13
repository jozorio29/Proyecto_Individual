import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actualizarClientePorId, crearCliente, obtenerClientePorId } from '../Service/ClienteService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ClienteForm = () => {
    const [cliente, setCliente] = useState({ name: '', phone: '', email: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            obtenerClientePorId(id)
                .then(response => {
                    setCliente(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener el cliente:", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            actualizarClientePorId(id, cliente)
                .then(() => {
                    navigate('/clientes');
                })
                .catch(error => {
                    console.error("Error al actualizar el cliente:", error);
                });
        } else {
            crearCliente(cliente)
                .then(() => {
                    navigate('/clientes');
                })
                .catch(error => {
                    console.error("Error al crear el cliente:", error);
                });
        }
    };

    return (
        <Container>
            <h2 className="my-4">{id ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={cliente.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={cliente.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={cliente.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    {id ? 'Actualizar' : 'Guardar'}
                </Button>
            </Form>
        </Container>
    );
};

export default ClienteForm;
