import axios from "axios";

const RESOURCE_BASE_URL = "http://localhost:3001";

function getAll() {
    return axios.get(`${RESOURCE_BASE_URL}/persons`).then(response => response.data);
}

function insert(data) {
    return axios.post(`${RESOURCE_BASE_URL}/persons`, data).then(response => response.data);
}

function remove(id) {
    return axios.delete(`${RESOURCE_BASE_URL}/persons/${id}`).then(response => response.data);
}

function update(id, data) {
    return axios.put(`${RESOURCE_BASE_URL}/persons/${id}`, data).then(response => response.data);
}

export default {
    getAll,
    insert,
    remove,
    update
};