import React, { useEffect, useState } from 'react';
import labService from '../services/labService';

function LabManagement() {
    const [labs, setLabs] = useState([]);
    const [labForm, setLabForm] = useState({ labName: '', location: '' });
    const [editingLabId, setEditingLabId] = useState(null);

    // Fetch all labs on component mount
    useEffect(() => {
        fetchAllLabs();
    }, []);

    const fetchAllLabs = () => {
        labService.fetchLabs()
            .then((data) => setLabs(data))
            .catch((error) => console.error('Error fetching labs:', error));
    };

    // Fetch single lab by ID
    const fetchLabById = (id) => {
        labService.fetchLabById(id)
            .then((lab) => {
                setLabForm(lab);
                setEditingLabId(lab.id);
            })
            .catch((error) => console.error('Error fetching lab by ID:', error));
    };

    // Create a new lab
    const createLab = () => {
        labService.createLab(labForm)
            .then(() => {
                setLabForm({ labName: '', location: '' });
                fetchAllLabs();
            })
            .catch((error) => console.error('Error creating lab:', error));
    };

    // Update an existing lab
    const updateLab = () => {
        if (editingLabId) {
            labService.updateLab(editingLabId, labForm)
                .then(() => {
                    setLabForm({ labName: '', location: '' });
                    setEditingLabId(null);
                    fetchAllLabs();
                })
                .catch((error) => console.error('Error updating lab:', error));
        }
    };

    // Delete a lab by ID
    const deleteLab = (id) => {
        labService.deleteLab(id)
            .then(() => fetchAllLabs())
            .catch((error) => console.error('Error deleting lab:', error));
    };

    // Process all labs
    const processAllLabs = () => {
        labs.forEach(lab => {
            labService.processLab(lab.id)
                .then(() => console.log(`Laboratorio ${lab.id} procesado`))
                .catch(error => console.error('Error processing lab:', error));
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLabId) {
            updateLab();
        } else {
            createLab();
        }
    };

    return (
        <div>
            <h1 style={styles.title}>Gestión de Laboratorios</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Nombre del Laboratorio"
                    value={labForm.labName}
                    onChange={(e) => setLabForm({ ...labForm, labName: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Ubicación"
                    value={labForm.location}
                    onChange={(e) => setLabForm({ ...labForm, location: e.target.value })}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>
                    {editingLabId ? 'Actualizar Laboratorio' : 'Crear Laboratorio'}
                </button>
            </form>
            <button style={styles.button} onClick={processAllLabs}>Procesar Todos los Laboratorios</button>
            {labs.map((lab) => (
                <div style={styles.card} key={lab.id}>
                    <h2 style={styles.subtitle}>Laboratorio: {lab.labName}</h2>
                    <p style={styles.info}>Ubicación: {lab.location}</p>
                    <button
                        style={styles.buttonSecondary}
                        onClick={() => fetchLabById(lab.id)}
                    >
                        Editar
                    </button>
                    <button
                        style={styles.buttonDelete}
                        onClick={() => deleteLab(lab.id)}
                    >
                        Eliminar
                    </button>
                    <button
                        style={styles.buttonSecondary}
                        onClick={() => labService.processLab(lab.id).then(() => {
                            alert(`Laboratorio ${lab.labName} procesado`);
                        })}
                    >
                        Procesar este Laboratorio
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#8e44ad',
        textAlign: 'center',
        marginBottom: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#8e44ad',
        color: 'white',
    },
    subtitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    info: {
        fontSize: '18px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'background-color 0.3s',
    },
    buttonSecondary: {
        padding: '8px 15px',
        fontSize: '16px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    buttonDelete: {
        padding: '8px 15px',
        fontSize: '16px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        marginBottom: '10px',
        width: '100%',
    },
    form: {
        marginBottom: '20px',
        textAlign: 'center',
    },
};

export default LabManagement;