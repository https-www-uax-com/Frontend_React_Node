import axios from 'axios';

const API_URL = '/api/experiment';

async function fetchExperiments() {
    const response = await axios.get(API_URL);
    return response.data;
}

async function fetchExperimentById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

async function createExperiment(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
}

async function updateExperiment(id, data) {
    await axios.put(`${API_URL}/${id}`, data);
}

async function deleteExperiment(id) {
    await axios.delete(`${API_URL}/${id}`);
}

async function processSingleExperiment(id) {
    await axios.post(`${API_URL}/process/${id}`);
}

export default {
    fetchExperiments,
    fetchExperimentById,
    createExperiment,
    updateExperiment,
    deleteExperiment,
    processSingleExperiment
};
