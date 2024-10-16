import axios from 'axios';

const API_URL = '/api/biological-datas';

async function fetchBiologicalData() {
    const response = await axios.get(API_URL);
    return response.data;
}

async function fetchBiologicalDataById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

async function updateBiologicalData(id, data) {
    await axios.put(`${API_URL}/${id}`, data);
}

async function processBiologicalData(id) {
    await axios.post(`${API_URL}/process/${id}`);
}

export default {
    fetchBiologicalData,
    fetchBiologicalDataById,
    updateBiologicalData,
    processBiologicalData
};
