import React, { useEffect, useState } from 'react';
import labService from '../services/labService';

function LabManagement() {
    const [labs, setLabs] = useState([]);
    const [labForm, setLabForm] = useState({ labName: '', location: '' });
    const [editingLabId, setEditingLabId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);  // Controla si el formulario de edición se muestra o no
    const [currentPage, setCurrentPage] = useState(0);  // Paginación
    const labsPerPage = 2;  // Cantidad de laboratorios por página

    // Fetch all labs on component mount
    useEffect(() => {
        fetchAllLabs();
    }, []);

    const fetchAllLabs = async () => {
        try {
            const data = await labService.fetchLabs();
            setLabs(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

    // Fetch single lab by ID
    const fetchLabById = async (id) => {
        try {
            const lab = await labService.fetchLabById(id);
            setLabForm(lab);
            setEditingLabId(lab.id);
            setIsEditing(true);  // Mostrar el formulario de edición
        } catch (error) {
            console.error('Error fetching lab by ID:', error);
        }
    };

    // Update an existing lab
    const updateLab = async () => {
        try {
            if (editingLabId) {
                await labService.updateLab(editingLabId, labForm);
                setLabForm({ labName: '', location: '' });
                setEditingLabId(null);
                setIsEditing(false);  // Ocultar el formulario de edición
                fetchAllLabs();
            }
        } catch (error) {
            console.error('Error updating lab:', error);
        }
    };

    // Process a lab
    const handleProcessLab = async (id) => {
        try {
            await labService.processLab(id);
            alert(`Laboratorio procesado exitosamente`);
        } catch (error) {
            console.error(`Error processing lab ${id}:`, error);
        }
    };

    // Clear the form
    const clearForm = () => {
        setLabForm({ labName: '', location: '' });
        setEditingLabId(null);
        setIsEditing(false);  // Ocultar el formulario de edición
    };

    // Paginación: obtener los laboratorios de la página actual
    const paginatedLabs = labs.slice(currentPage * labsPerPage, (currentPage + 1) * labsPerPage);

    const goToNextPage = () => {
        if ((currentPage + 1) * labsPerPage < labs.length) {
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
            <h1 style={styles.title}>Lab Management</h1>

            {/* Formulario para editar */}
            {isEditing && (
                <div style={styles.form}>
                    <h3 style={styles.formTitle}>Edit Lab</h3>
                    <input
                        type="text"
                        placeholder="Lab Name"
                        value={labForm.labName}
                        onChange={(e) => setLabForm({ ...labForm, labName: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={labForm.location}
                        onChange={(e) => setLabForm({ ...labForm, location: e.target.value })}
                        style={styles.input}
                    />
                    <div style={styles.buttonGroup}>
                        <button onClick={updateLab} style={styles.button}>Update Lab</button>
                        <button onClick={clearForm} style={styles.buttonClear}>Clear</button>
                    </div>
                </div>
            )}

            {/* Lista de laboratorios */}
            <div style={styles.listContainer}>
                {paginatedLabs.map((lab) => (
                    <div style={styles.card} key={lab.id}>
                        <h2 style={styles.subtitle}>Lab: {lab.labName}</h2>
                        <p style={styles.info}>Location: {lab.location}</p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.buttonSecondary} onClick={() => fetchLabById(lab.id)}>
                                Edit
                            </button>
                            <button style={styles.buttonProcess} onClick={() => handleProcessLab(lab.id)}>
                                Process
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div style={styles.pagination}>
                <button onClick={goToPreviousPage} style={styles.paginationButton} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={goToNextPage} style={styles.paginationButton} disabled={(currentPage + 1) * labsPerPage >= labs.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
    },
    title: {
        textAlign: 'center',
        fontSize: '26px',
        marginBottom: '20px',
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
    },
    formTitle: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonClear: {
        padding: '10px 20px',
        backgroundColor: '#7f8c8d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    listContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff', // Fondo blanco para más contraste
        color: '#2c3e50', // Color más oscuro para el texto
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar el contenedor
    },
    buttonProcess: {
        padding: '8px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    buttonSecondary: {
        padding: '8px',
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    paginationButton: {
        padding: '10px 15px',
        fontSize: '16px',
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '0 10px',
        transition: 'background-color 0.3s',
    },
};

export default LabManagement;
