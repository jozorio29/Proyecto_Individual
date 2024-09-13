import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import delhorno from '../Nav/delhorno.png';


const BarraDeNavegacion = () => {
    return (
        <Navbar bg="success" expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src={delhorno}
                        height="80"
                        width="100"
                        className="d-inline-block align-top rounded"
                        alt="Del Horno"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown 
                            className="dropdown" 
                            title={<><i className="fas fa-chart-line me-2"></i>Ventas</>} 
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="/ventas-form">Formulario de Ventas</NavDropdown.Item>
                            <NavDropdown.Item href="/ventas-lista">Planillas de Ventas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/factura">
                            <i className="fas fa-file-invoice me-2"></i>Factura
                        </Nav.Link>
                        <Nav.Link href="/clientes">
                            <i className="fa-solid fa-user me-2"></i>Clientes
                        </Nav.Link>
                        <Nav.Link href="/clientes/agregar">
                            <i className="fa-regular fa-address-card me-2"></i>Agregar Clientes
                        </Nav.Link>
                        <Nav.Link href="/productos">
                            <i className="fa-solid fa-pizza-slice me-2"></i>Productos
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default BarraDeNavegacion;
