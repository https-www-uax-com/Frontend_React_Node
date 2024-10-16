import React, { useEffect, useState } from 'react';
import researcherService from '../services/researcherService';

function ResearcherManagement() {
    const [researchers, setResearchers] = useState([]);
    const [selectedResearcher, setSelectedResearcher] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialty: ''
    });
    const [isEditing, setIsEditing] = useState(false);  // Controla si el formulario de edición se muestra o no
    const [currentPage, setCurrentPage] = useState(0);  // Paginación
    const researchersPerPage = 2;  // Cantidad de investigadores por página

    useEffect(() => {
        loadResearchers();
    }, []);

    const loadResearchers = async () => {
        try {
            const response = await researcherService.fetchResearchers();
            setResearchers(response);
        } catch (error) {
            console.error('Error fetching researchers:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await researcherService.fetchResearcherById(id);
            setSelectedResearcher(response);
            setFormData({
                name: response.name,
                specialty: response.specialty
            });
            setIsEditing(true);  // Mostrar el formulario de edición
        } catch (error) {
            console.error('Error fetching researcher:', error);
        }
    };

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

    const handleProcessResearcher = async (id) => {
        try {
            await researcherService.processResearcher(id);
            alert(`Researcher ${id} processed successfully!`);
        } catch (error) {
            console.error(`Error processing researcher ${id}:`, error);
        }
    };

    const clearForm = () => {
        setFormData({ name: '', specialty: '' });
        setSelectedResearcher(null);
        setIsEditing(false);  // Ocultar el formulario de edición
    };

    // Paginación: obtener los investigadores de la página actual
    const paginatedResearchers = researchers.slice(currentPage * researchersPerPage, (currentPage + 1) * researchersPerPage);

    const goToNextPage = () => {
        if ((currentPage + 1) * researchersPerPage < researchers.length) {
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
            <h2 style={styles.title}>Gestor de Investigadores</h2>

            {/* Formulario para editar */}
            {isEditing && (
                <div style={styles.form}>
                    <h3 style={styles.formTitle}>Edit Researcher</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Specialty"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        style={styles.input}
                    />
                    <div style={styles.buttonGroup}>
                        <button onClick={handleUpdate} style={styles.button}>Update Researcher</button>
                        <button onClick={clearForm} style={styles.buttonClear}>Clear</button>
                    </div>
                </div>
            )}

            {/* Lista de investigadores */}
            <h3 style={styles.subTitle}>Lista de Investigadores </h3>
            <div style={styles.listContainer}>
                {paginatedResearchers.map((researcher) => (
                    <div key={researcher.id} style={styles.researcherCard}>
                        <p><strong>Name:</strong> {researcher.name}</p>
                        <p><strong>Specialty:</strong> {researcher.specialty}</p>
                        <div style={styles.buttonGroup}>
                            <button onClick={() => handleEdit(researcher.id)} style={styles.button}>Edit</button>
                            <button onClick={() => handleProcessResearcher(researcher.id)} style={styles.buttonProcess}>Process</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div style={styles.pagination}>
                <button onClick={goToPreviousPage} style={styles.paginationButton} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={goToNextPage} style={styles.paginationButton} disabled={(currentPage + 1) * researchersPerPage >= researchers.length}>
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
    subTitle: {
        fontSize: '20px',
        color: '#2c3e50',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    listContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    researcherCard: {
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

export default ResearcherManagement;
