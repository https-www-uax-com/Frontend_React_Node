import React from 'react';
import SampleManagement from '../../components/SampleManagement';
import ExperimentManagement from '../../components/ExperimentManagement';

function ResearcherPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel del Investigador</h1>
            <div style={styles.section}>
                <SampleManagement />
            </div>
            <div style={styles.section}>
                <ExperimentManagement />
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#2c3e50', // Fondo gris oscuro
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
    section: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
};

export default ResearcherPage;
