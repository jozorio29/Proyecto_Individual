import axios from 'axios';

const API_URL = 'http://localhost:8000/api/clientes';

export const obtenerClientes = () => {
    return axios.get(API_URL);
};

export const crearCliente = (cliente) => {
    return axios.post(API_URL, cliente);
};

export const obtenerClientePorId = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const actualizarClientePorId = (id, cliente) => {
    return axios.put(`${API_URL}/${id}`, cliente);
};

export const eliminarClientePorId = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
