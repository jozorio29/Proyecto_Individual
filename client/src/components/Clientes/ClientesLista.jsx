import React, { useEffect, useState } from 'react';
import { eliminarClientePorId, obtenerClientes } from '../Service/ClienteService';
import { Table, Button, Container } from 'react-bootstrap';

const ClientesLista = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        obtenerClientes()
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los clientes:", error);
            });
    }, []);

    const handleEliminar = (id) => {
        eliminarClientePorId(id)
            .then(() => {
                setClientes(clientes.filter(cliente => cliente._id !== id));
            })
            .catch(error => {
                console.error("Error al eliminar el cliente:", error);
            });
    };

    return (
        <Container>
            <h2 className="my-4">Lista de Clientes</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente._id}>
                            <td>{cliente.name}</td>
                            <td>{cliente.phone}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleEliminar(cliente._id)}
                                    className="me-2"
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ClientesLista;
