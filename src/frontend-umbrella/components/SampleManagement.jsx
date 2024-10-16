import React, { useEffect, useState } from 'react';
import sampleService from '../services/sampleService';
import biologicalDataService from "../services/biologicalDataService";

function SampleManagement() {
    const [samples, setSamples] = useState([]);
    const [sampleForm, setSampleForm] = useState({
        uspCategory: '',
        uspClass: '',
        uspDrug: '',
        keggIdDrug: '',
        drugExample: '',
        nomenclature: ''
    });
    const [editingSampleId, setEditingSampleId] = useState(null);
    const [editingBiologicalData, setEditingBiologicalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const samplesPerPage = 6;

    useEffect(() => {
        fetchAllSamples();
    }, []);


    const fetchAllSamples = () => {
        sampleService.fetchSamples()
            .then((data) => setSamples(data))
            .catch((error) => console.error('Error fetching samples:', error));
    };

    const updateSample = () => {
        if (editingSampleId) {
            sampleService.updateSample(editingSampleId, sampleForm)
                .then(() => {
                    setSampleForm({
                        uspCategory: '',
                        uspClass: '',
                        uspDrug: '',
                        keggIdDrug: '',
                        drugExample: '',
                        nomenclature: ''
                    });
                    setEditingSampleId(null);
                    fetchAllSamples();
                })
                .catch((error) => console.error('Error updating sample:', error));
        }
    };

    const updateBiologicalData = (bioData) => {
        biologicalDataService.updateBiologicalData(bioData.id, bioData)
            .then(() => {
                alert(`Datos biológicos para la muestra ${bioData.id} actualizados`);
                fetchAllSamples(); // Actualiza la lista tras la modificación
            })
            .catch((error) => console.error(`Error actualizando datos biológicos ${bioData.id}:`, error));
    };

    const handleSubmitBiologicalData = (e, bioData) => {
        e.preventDefault();
        updateBiologicalData(bioData);
    };

    const handleBiologicalDataChange = (e) => {
        const { name, value } = e.target;
        setEditingBiologicalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditBiologicalData = (bioData) => {
        setEditingBiologicalData(bioData);
    };

    // Paginación: Obtener muestras de la página actual
    const paginatedSamples = samples.slice(currentPage * samplesPerPage, (currentPage + 1) * samplesPerPage);

    // Funciones de navegación de página
    const goToNextPage = () => {
        if ((currentPage + 1) * samplesPerPage < samples.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestión de Muestras</h1>
            <button style={styles.processButton} onClick={() => sampleService.processSamplesConcurrently()}>Procesar Todas las Muestras</button>

            <div style={styles.cardContainer}>
                {paginatedSamples.map((sample) => (
                    <div style={styles.card} key={sample.id}>
                        <h2 style={styles.subtitle}>Muestra: {sample.uspDrug}</h2>
                        <p style={styles.info}>Categoría: {sample.uspCategory}</p>
                        <p style={styles.info}>Clase: {sample.uspClass}</p>
                        <p style={styles.info}>KEGG ID: {sample.keggIdDrug}</p>
                        <p style={styles.info}>Ejemplo de Droga: {sample.drugExample}</p>
                        <p style={styles.info}>Nomenclatura: {sample.nomenclature}</p>

                        {sample.biologicalData && (
                            <div style={styles.biologicalDataCard}>
                                <h3 style={styles.bioDataTitle}>Datos Biológicos</h3>
                                {editingBiologicalData && editingBiologicalData.id === sample.biologicalData.id ? (
                                    <form onSubmit={(e) => handleSubmitBiologicalData(e, editingBiologicalData)}>
                                        <input
                                            type="text"
                                            name="sampleType"
                                            value={editingBiologicalData.sampleType}
                                            onChange={handleBiologicalDataChange}
                                            style={styles.input}
                                            placeholder="Tipo de Muestra"
                                        />
                                        <input
                                            type="text"
                                            name="data"
                                            value={editingBiologicalData.data}
                                            onChange={handleBiologicalDataChange}
                                            style={styles.input}
                                            placeholder="Datos"
                                        />
                                        <input
                                            type="text"
                                            name="analysisResult"
                                            value={editingBiologicalData.analysisResult}
                                            onChange={handleBiologicalDataChange}
                                            style={styles.input}
                                            placeholder="Resultado del análisis"
                                        />
                                        <button type="submit" style={styles.updateButton}>Actualizar Datos</button>
                                    </form>
                                ) : (
                                    <>
                                        <p style={styles.info}>Tipo de Muestra: {sample.biologicalData.sampleType}</p>
                                        <p style={styles.info}>Datos: {sample.biologicalData.data}</p>
                                        <p style={styles.info}>Resultado: {sample.biologicalData.analysisResult}</p>
                                        <p style={styles.info}>Fecha: {new Date(sample.biologicalData.timestamp).toLocaleString()}</p>
                                        <button
                                            style={styles.editButton}
                                            onClick={() => handleEditBiologicalData(sample.biologicalData)}
                                        >
                                            Editar Datos Biológicos
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        <div style={styles.buttonGroup}>
                            <button style={styles.buttonSecondary} onClick={() => sampleService.fetchSampleById(sample.id)}>Editar</button>
                            <button style={styles.buttonDelete} onClick={() => sampleService.deleteSample(sample.id)}>Eliminar</button>
                            <button style={styles.buttonSecondary} onClick={() => sampleService.processSingleSample(sample.id)}>Procesar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.pagination}>
                <button style={styles.navButton} onClick={goToPreviousPage} disabled={currentPage === 0}>Anterior</button>
                <button style={styles.navButton} onClick={goToNextPage} disabled={(currentPage + 1) * samplesPerPage >= samples.length}>Siguiente</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px',
    },
    processButton: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'center',
        marginBottom: '20px',
        display: 'block',
        width: '100%',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#f5f7fa',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    info: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    biologicalDataCard: {
        backgroundColor: '#eafaf1',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '10px',
    },
    bioDataTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        display: 'block',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonSecondary: {
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    buttonDelete: {
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    updateButton: {
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: '#f39c12',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
        marginTop: '10px',
    },
    editButton: {
        padding: '8px 12px',
        fontSize: '14px',
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
        marginTop: '10px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    navButton: {
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

export default SampleManagement;
