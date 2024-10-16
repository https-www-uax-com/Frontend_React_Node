import React, { useEffect, useState } from 'react';
import researcherService from '../services/researcherService';

function ResearcherManagement() {
    const [researchers, setResearchers] = useState([]);
    const [selectedResearcher, setSelectedResearcher] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialty: ''
    });

    // Fetch all researchers when the component mounts
    useEffect(() => {
        loadResearchers();
    }, []);

    // Fetch researchers and set state
    const loadResearchers = async () => {
        try {
            const response = await researcherService.fetchResearchers();
            setResearchers(response);
        } catch (error) {
            console.error('Error fetching researchers:', error);
        }
    };

    // Fetch a specific researcher by ID
    const handleEdit = async (id) => {
        try {
            const response = await researcherService.fetchResearcherById(id);
            setSelectedResearcher(response);
            setFormData({
                name: response.name,
                specialty: response.specialty
            });
        } catch (error) {
            console.error('Error fetching researcher:', error);
        }
    };

    // Create a new researcher
    const handleCreate = async () => {
        try {
            const newResearcher = { ...formData };
            await researcherService.createResearcher(newResearcher);
            loadResearchers();
            clearForm();
        } catch (error) {
            console.error('Error creating researcher:', error);
        }
    };

    // Update an existing researcher
    const handleUpdate = async () => {
        try {
            if (selectedResearcher) {
                await researcherService.updateResearcher(selectedResearcher.id, formData);
                loadResearchers();
                clearForm();
            }
        } catch (error) {
            console.error('Error updating researcher:', error);
        }
    };

    // Delete a researcher by ID
    const handleDelete = async (id) => {
        try {
            await researcherService.deleteResearcher(id);
            loadResearchers();
        } catch (error) {
            console.error('Error deleting researcher:', error);
        }
    };

    // Process a specific researcher by ID
    const handleProcessResearcher = async (id) => {
        try {
            await researcherService.processResearcher(id);
            alert(`Researcher ${id} processed successfully!`);
        } catch (error) {
            console.error(`Error processing researcher ${id}:`, error);
        }
    };

    // Clear the form and reset selectedResearcher
    const clearForm = () => {
        setFormData({ name: '', specialty: '' });
        setSelectedResearcher(null);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión de Investigadores</h2>

            {/* Formulario para crear o editar */}
            <div style={styles.form}>
                <h3>{selectedResearcher ? 'Editar Investigador' : 'Crear Investigador'}</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Especialidad"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    style={styles.input}
                />
                <div>
                    {selectedResearcher ? (
                        <button onClick={handleUpdate} style={styles.button}>Actualizar Investigador</button>
                    ) : (
                        <button onClick={handleCreate} style={styles.button}>Crear Investigador</button>
                    )}
                    <button onClick={clearForm} style={styles.buttonClear}>Limpiar</button>
                </div>
            </div>

            {/* Lista de investigadores */}
            <h3 style={styles.subTitle}>Lista de Investigadores</h3>
            <div style={styles.list}>
                {researchers.map((researcher) => (
                    <div key={researcher.id} style={styles.researcherCard}>
                        <p><strong>Nombre:</strong> {researcher.name}</p>
                        <p><strong>Especialidad:</strong> {researcher.specialty}</p>
                        <div>
                            <button onClick={() => handleEdit(researcher.id)} style={styles.button}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(researcher.id)} style={styles.buttonDelete}>
                                Eliminar
                            </button>
                            <button onClick={() => handleProcessResearcher(researcher.id)} style={styles.buttonProcess}>
                                Procesar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        fontSize: '28px',
        color: '#2980b9',
        marginBottom: '20px',
    },
    form: {
        backgroundColor: '#ecf0f1',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    input: {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #bdc3c7',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    buttonClear: {
        padding: '10px 20px',
        backgroundColor: '#7f8c8d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonDelete: {
        padding: '5px 10px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    buttonProcess: {
        padding: '5px 10px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    subTitle: {
        fontSize: '22px',
        color: '#2c3e50',
        marginBottom: '10px',
    },
    list: {
        backgroundColor: '#ecf0f1',
        padding: '20px',
        borderRadius: '8px',
    },
    researcherCard: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export default ResearcherManagement;