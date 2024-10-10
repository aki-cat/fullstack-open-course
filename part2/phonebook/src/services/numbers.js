import axios from "axios";

const RESOURCE_BASE_URL = "http://localhost:3001";

function getAll() {
    return axios.get(`${RESOURCE_BASE_URL}/persons`).then(response => response.data);
}

function insert(newNumber) {
    return axios.post(`${RESOURCE_BASE_URL}/persons`, newNumber).then(response => response.data);
}


export default {
    getAll,
    insert,
};