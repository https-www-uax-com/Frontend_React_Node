import React, { useEffect, useState } from 'react';
import biologicalDataService from '../services/biologicalDataService';

function BiologicalDataManagement() {
    const [biologicalDataList, setBiologicalDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const dataPerPage = 9; // Mostrar 9 datos biológicos por contenedor

    useEffect(() => {
        fetchAllBiologicalData();
    }, []);

    const fetchAllBiologicalData = () => {
        biologicalDataService.fetchBiologicalData()
            .then((data) => setBiologicalDataList(data))
            .catch((error) => console.error('Error fetching biological data:', error));
    };

    // Paginar los datos biológicos
    const paginatedData = biologicalDataList.slice(currentPage * dataPerPage, (currentPage + 1) * dataPerPage);

    const goToNextPage = () => {
        if ((currentPage + 1) * dataPerPage < biologicalDataList.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Procesar todos los datos biológicos
    const processAllBiologicalData = () => {
        biologicalDataList.forEach(bioData => {
            biologicalDataService.processBiologicalData(bioData.id)
                .then(() => console.log(`Biological data ${bioData.id} processed`))
                .catch(error => console.error('Error processing biological data:', error));
        });
    };

    // Procesar un solo dato biológico
    const processSingleBiologicalData = (id) => {
        biologicalDataService.processBiologicalData(id)
            .then(() => {
                alert(`Datos biológicos con ID ${id} procesados`);
                fetchAllBiologicalData();
            })
            .catch(error => console.error('Error processing biological data:', error));
    };

    if (!biologicalDataList.length) {
        return <p style={styles.noData}>No hay datos biológicos disponibles.</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestión de Datos Biológicos</h1>
            <button style={styles.button} onClick={processAllBiologicalData}>Procesar Todos los Datos</button>

            <div style={styles.cardContainer}>
                {paginatedData.map((bioData) => (
                    <div style={styles.card} key={bioData.id}>
                        <h2 style={styles.subtitle}>Tipo de Muestra: {bioData.sampleType}</h2>
                        <p style={styles.info}>Datos: {bioData.data}</p>
                        <p style={styles.info}>Fecha: {new Date(bioData.timestamp).toLocaleString()}</p>
                        <div style={styles.buttonGroup}>
                            <button style={styles.buttonSecondary} onClick={() => processSingleBiologicalData(bioData.id)}>Procesar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.pagination}>
                <button style={styles.navButton} onClick={goToPreviousPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <button style={styles.navButton} onClick={goToNextPage} disabled={(currentPage + 1) * dataPerPage >= biologicalDataList.length}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#add8e6',
        color: 'black',
    },
    subtitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    info: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
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
    },
    buttonSecondary: {
        padding: '8px 15px',
        fontSize: '16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
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
    noData: {
        fontSize: '20px',
        color: '#e74c3c',
        textAlign: 'center',
    },
};

export default BiologicalDataManagement;