import React from 'react';
import LabManagement from '../../components/LabManagement';
import ResearcherManagement from '../../components/ResearcherManagement';
import ExperimentManagement from '../../components/ExperimentManagement';

function AdminPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel de Administración</h1>
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
