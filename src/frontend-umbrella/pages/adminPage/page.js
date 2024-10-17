import React, { useState } from 'react';
import LabManagement from '../../components/LabManagement';
import ResearcherManagement from '../../components/ResearcherManagement';
import ExperimentManagement from '../../components/ExperimentManagement';
import RegisterPage from '../../components/auth/RegisterPageAdmin'; // Página de registro

function AdminPage() {
    const [showRegisterForm, setShowRegisterForm] = useState(false); // Controla si se muestra el formulario

    const handleOpenRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleCloseRegisterForm = () => {
        setShowRegisterForm(false);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel de Administración</h1>

            {/* Botón de registrar usuario */}
            <button style={styles.registerButton} onClick={handleOpenRegisterForm}>
                Registrar Cuenta [Administrador - Investigador]
            </button>

            {/* Modal para el formulario de registro */}
            {showRegisterForm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button style={styles.closeButton} onClick={handleCloseRegisterForm}>
                            X
                        </button>
                        <RegisterPage /> {/* Reutilizando el formulario de registro */}
                    </div>
                </div>
            )}

            <div style={styles.topSection}>
                <div style={styles.leftSection}>
                    <LabManagement />
                </div>
                <div style={styles.rightSection}>
                    <ResearcherManagement />
                </div>
            </div>
            <div style={styles.bottomSection}>
                <ExperimentManagement />
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#2c3e50', // Fondo gris oscuro para la página
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#ecf0f1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '40px',
    },
    title: {
        fontSize: '36px',
        color: '#ecf0f1',
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: 'bold',
        borderBottom: '2px solid #8e44ad',
        paddingBottom: '10px',
    },
    registerButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', // Mantiene el 100% de ancho de la ventana
        height: '100vh', // Mantiene el 100% de altura de la ventana
        backgroundColor: 'transparent', // Fondo transparente
        display: 'flex',
        justifyContent: 'flex-end', // Alinea el modal a la derecha
        alignItems: 'center', // Centra verticalmente
        paddingRight: '20px', // Añade un poco de espacio desde el borde derecho
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '-60px', // Reduce el padding
        borderRadius: '10px',
        width: '300px', // Reduce el tamaño del modal
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        marginRight: '40px', // Añade un margen adicional para ajustar el modal aún más a la derecha
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#2c3e50',
    },
    topSection: {
        display: 'flex',
        width: '90%',
        maxWidth: '1200px',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '40px', // Espacio entre las dos secciones
    },
    leftSection: {
        flex: 1,
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    rightSection: {
        flex: 1,
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    bottomSection: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default AdminPage;