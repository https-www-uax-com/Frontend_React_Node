import React, { useEffect, useState } from 'react';
import experimentService from '../services/experimentService';

function ExperimentManagement() {
    const [experiments, setExperiments] = useState([]);
    const [selectedExperiment, setSelectedExperiment] = useState(null);
    const [formData, setFormData] = useState({
        experimentName: '',
        startDate: '',
        endDate: '',
    });
    const [showExperiments, setShowExperiments] = useState(false); // Para controlar el desplegable de la lista de experimentos
    const [currentPage, setCurrentPage] = useState(0);  // Paginación
    const experimentsPerPage = 9;  // Número de experimentos por página

    // Fetch all experiments when the component mounts
    useEffect(() => {
        loadExperiments();
    }, []);

    const loadExperiments = async () => {
        try {
            const response = await experimentService.fetchExperiments();
            setExperiments(response);
        } catch (error) {
            console.error('Error fetching experiments:', error);
        }
    };

    // Paginación: obtener los experimentos de la página actual
    const paginatedExperiments = experiments.slice(currentPage * experimentsPerPage, (currentPage + 1) * experimentsPerPage);

    const goToNextPage = () => {
        if ((currentPage + 1) * experimentsPerPage < experiments.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await experimentService.fetchExperimentById(id);
            setSelectedExperiment(response);
            setFormData({
                experimentName: response.experimentName,
                startDate: response.startDate,
                endDate: response.endDate,
            });
        } catch (error) {
            console.error('Error fetching experiment:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (selectedExperiment) {
                // Enviar la fecha con formato completo 'yyyy-MM-ddTHH:mm:ss'
                const updatedExperiment = {
                    experimentName: formData.experimentName,
                    startDate: formData.startDate,  // Ya contiene el 'T00:00:00'
                    endDate: formData.endDate,      // Ya contiene el 'T00:00:00'
                };

                console.log("Datos enviados para actualización:", updatedExperiment);

                await experimentService.updateExperiment(selectedExperiment.id, updatedExperiment);
                loadExperiments();
                clearForm();
            }
        } catch (error) {
            console.error('Error actualizando el experimento:', error);
            console.log("Detalles del error desde el servidor:", error.response?.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            await experimentService.deleteExperiment(id);
            loadExperiments();
        } catch (error) {
            console.error('Error eliminando el experimento:', error);
        }
    };

    const handleProcessExperiment = async (id) => {
        try {
            await experimentService.processSingleExperiment(id);
            alert(`Experiment ${id} processed successfully!`);
        } catch (error) {
            console.error(`Error procesando el experimento ${id}:`, error);
        }
    };

    const clearForm = () => {
        setFormData({ experimentName: '', startDate: '', endDate: '' });
        setSelectedExperiment(null);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión de Experimentos</h2>

            {/* Botón para mostrar/ocultar lista de experimentos */}
            <button style={styles.toggleButton} onClick={() => setShowExperiments(!showExperiments)}>
                {showExperiments ? 'Ocultar Experimentos' : 'Mostrar Experimentos'}
            </button>

            {/* Lista de experimentos */}
            {showExperiments && (
                <div style={styles.experimentsContainer}>
                    {paginatedExperiments.map((experiment) => (
                        <div key={experiment.id} style={styles.experimentCard}>
                            <p><strong>Nombre:</strong> {experiment.experimentName}</p>
                            <p><strong>Fecha de Inicio:</strong> {experiment.startDate}</p>
                            <p><strong>Fecha de Finalización:</strong> {experiment.endDate}</p>
                            <div>
                                <button onClick={() => handleEdit(experiment.id)} style={styles.button}>Editar</button>
                                <button onClick={() => handleDelete(experiment.id)} style={styles.buttonDelete}>Eliminar</button>
                                <button onClick={() => handleProcessExperiment(experiment.id)} style={styles.buttonProcess}>Procesar</button>
                            </div>
                        </div>
                    ))}

                    {/* Paginación */}
                    <div style={styles.pagination}>
                        <button onClick={goToPreviousPage} style={styles.paginationButton} disabled={currentPage === 0}>
                            Anterior
                        </button>
                        <button onClick={goToNextPage} style={styles.paginationButton} disabled={(currentPage + 1) * experimentsPerPage >= experiments.length}>
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {/* Formulario de edición de experimentos */}
            {selectedExperiment && (
                <div style={styles.form}>
                    <h3>Editar Experimento</h3>
                    <input
                        type="text"
                        placeholder="Nombre del Experimento"
                        value={formData.experimentName}
                        onChange={(e) => setFormData({ ...formData, experimentName: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Fecha de Inicio"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Fecha de Finalización"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        style={styles.input}
                    />
                    <div>
                        <button onClick={handleUpdate} style={styles.button}>Actualizar Experimento</button>
                        <button onClick={clearForm} style={styles.buttonClear}>Limpiar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        fontSize: '26px',
        marginBottom: '20px',
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    toggleButton: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        transition: 'background-color 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    form: {
        marginTop: '30px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '10px',
        marginTop: '10px',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    buttonClear: {
        padding: '10px 15px',
        backgroundColor: '#7f8c8d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    experimentsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '25px',
    },
    experimentCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        color: '#2c3e50',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    buttonDelete: {
        padding: '8px 12px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '10px',
        marginTop: '10px', // Agrega margen superior a este botón
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
    buttonProcess: {
        padding: '8px 12px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
    },
    paginationButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        margin: '0 10px',
        transition: 'background-color 0.3s',
    },
};

export default ExperimentManagement;

