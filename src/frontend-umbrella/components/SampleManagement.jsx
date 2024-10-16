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

    // Fetch all samples from the server
    const fetchAllSamples = () => {
        sampleService.fetchSamples()
            .then((data) => setSamples(data))
            .catch((error) => console.error('Error fetching samples:', error));
    };

    // Handle edit button for a sample
    const handleEditSample = (id) => {
        sampleService.fetchSampleById(id)
            .then((data) => {
                // Cargar los datos del sample en el formulario
                setSampleForm({
                    uspCategory: data.uspCategory,
                    uspClass: data.uspClass,
                    uspDrug: data.uspDrug,
                    keggIdDrug: data.keggIdDrug,
                    drugExample: data.drugExample,
                    nomenclature: data.nomenclature
                });
                setEditingSampleId(id); // Guardar el ID que se está editando
            })
            .catch((error) => console.error('Error fetching sample:', error));
    };

    // Actualizar una muestra
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
                    setEditingSampleId(null); // Limpiar el estado de edición
                    fetchAllSamples(); // Recargar todas las muestras
                })
                .catch((error) => console.error('Error updating sample:', error));
        }
    };

    // Manejar el evento de envío del formulario de edición
    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar que la página se recargue
        updateSample(); // Llamar a la función de actualización
    };

    // Actualizar datos biológicos
    const updateBiologicalData = (bioData) => {
        biologicalDataService.updateBiologicalData(bioData.id, bioData)
            .then(() => {
                alert(`Datos biológicos para la muestra ${bioData.id} actualizados`);
                fetchAllSamples();
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

    const paginatedSamples = samples.slice(currentPage * samplesPerPage, (currentPage + 1) * samplesPerPage);

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

            {/* Formulario de edición de muestra */}
            {editingSampleId && (
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Editar Muestra</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Categoría"
                            value={sampleForm.uspCategory}
                            onChange={(e) => setSampleForm({...sampleForm, uspCategory: e.target.value})}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Clase"
                            value={sampleForm.uspClass}
                            onChange={(e) => setSampleForm({...sampleForm, uspClass: e.target.value})}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Droga"
                            value={sampleForm.uspDrug}
                            onChange={(e) => setSampleForm({...sampleForm, uspDrug: e.target.value})}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="KEGG ID"
                            value={sampleForm.keggIdDrug}
                            onChange={(e) => setSampleForm({...sampleForm, keggIdDrug: e.target.value})}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Ejemplo de Droga"
                            value={sampleForm.drugExample}
                            onChange={(e) => setSampleForm({...sampleForm, drugExample: e.target.value})}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nomenclatura"
                            value={sampleForm.nomenclature}
                            onChange={(e) => setSampleForm({ ...sampleForm, nomenclature: e.target.value })}
                            style={styles.input}
                        />
                        <button onClick={updateSample} style={styles.updateButton}>Actualizar Muestra</button>
                    </form>
                </div>
            )}

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
                                            value={editingBiologicalData.sampleType || ""}
                                            onChange={handleBiologicalDataChange}
                                            style={styles.input}
                                            placeholder="Tipo de Muestra"
                                        />
                                        <input
                                            type="text"
                                            name="data"
                                            value={editingBiologicalData.data || ""}
                                            onChange={handleBiologicalDataChange}
                                            style={styles.input}
                                            placeholder="Datos"
                                        />
                                        <button type="submit" style={styles.updateButton}>Actualizar Datos</button>
                                    </form>
                                ) : (
                                    <>
                                        <p style={styles.info}>Tipo de Muestra: {sample.biologicalData.sampleType || 'No disponible'}</p>
                                        <p style={styles.info}>Datos: {sample.biologicalData.data || 'No disponible'}</p>
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
                            <button style={styles.buttonSecondary} onClick={() => handleEditSample(sample.id)}>Editar</button>
                            <button style={styles.buttonDelete} onClick={() => handleDeleteSample(sample.id)}>Eliminar</button>
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
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        color: '#2c3e50',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
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
        padding: '10px 20px',
        backgroundColor: '#f39c12',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
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
    formContainer: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        marginTop: '20px', // Añadir margen superior
    },
    formTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000',  // Cambia el color del texto a negro
        marginBottom: '15px',
    },
};

export default SampleManagement;

