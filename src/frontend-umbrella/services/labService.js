import axios from 'axios';

const API_URL = '/api/lab';

async function fetchLabs() {
    const response = await axios.get(API_URL);
    return response.data;
}

async function fetchLabById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

async function createLab(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
}

async function updateLab(id, data) {
    await axios.put(`${API_URL}/${id}`, data);
}

async function deleteLab(id) {
    await axios.delete(`${API_URL}/${id}`);
}

async function processLab(id) {
    await axios.post(`${API_URL}/process/${id}`);
}

export default {
    fetchLabs,
    fetchLabById,
    createLab,
    updateLab,
    deleteLab,
    processLab
};
