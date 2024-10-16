import axios from 'axios';

const API_URL = '/api/sample';

async function fetchSamples() {
    const response = await axios.get(API_URL);
    return response.data;
}

async function fetchSampleById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

async function createSample(data) {
    const response = await axios.post(API_URL, data);
    return response.data;
}

async function updateSample(id, data) {
    await axios.put(`${API_URL}/${id}`, data);
}

async function deleteSample(id) {
    await axios.delete(`${API_URL}/${id}`);
}

async function processSamplesConcurrently() {
    await axios.post(`${API_URL}/process`);
}

async function processSingleSample(id) {
    await axios.post(`${API_URL}/process/${id}`);
}

export default {
    fetchSamples,
    fetchSampleById,
    updateSample,
    deleteSample,
    processSamplesConcurrently,
    processSingleSample
};