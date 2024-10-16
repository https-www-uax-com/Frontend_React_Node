import axios from 'axios';

const API_URL = '/api/researcher';

async function fetchResearchers() {
    const response = await axios.get(API_URL);
    return response.data;
}

async function fetchResearcherById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

async function createResearcher(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
}

async function updateResearcher(id, data) {
    await axios.put(`${API_URL}/${id}`, data);
}

async function deleteResearcher(id) {
    await axios.delete(`${API_URL}/${id}`);
}

async function processResearcher(id) {
    await axios.post(`${API_URL}/process/${id}`);
}

export default {
    fetchResearchers,
    fetchResearcherById,
    createResearcher,
    updateResearcher,
    deleteResearcher,
    processResearcher
};