import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import AdminPage from './pages/AdminPage/page';
import ResearcherPage from './pages/ResearcherPage/page';
import UserPage from './pages/UserPage/page';

// Función para codificar rutas
const encodeRoute = (route) => {
    return btoa(route);
};

// Función para decodificar rutas
const decodeRoute = (encodedRoute) => {
    return atob(encodedRoute);
};

// Página principal con enlaces codificados
function HomePage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenido al Sistema de Gestión de Experimentación Biológica</h1>
            <div style={styles.buttonContainer}>
                <Link to={`/route/${encodeRoute('/admin')}`} style={styles.link}>
                    <button style={styles.button}>Panel de Administración</button>
                </Link>
                <Link to={`/route/${encodeRoute('/researcher')}`} style={styles.link}>
                    <button style={styles.button}>Panel del Investigador</button>
                </Link>
                <Link to={`/route/${encodeRoute('/user')}`} style={styles.link}>
                    <button style={styles.button}>Panel del Usuario</button>
                </Link>
            </div>
        </div>
    );
}

// Página para decodificar la ruta y redirigir
function RouteRedirect() {
    const { encodedRoute } = useParams();
    const navigate = useNavigate();

    const decodedRoute = decodeRoute(encodedRoute);

    // Redirigir a la ruta decodificada
    React.useEffect(() => {
        navigate(decodedRoute);
    }, [decodedRoute, navigate]);

    return <div>Cargando...</div>; // Mientras se redirige
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta para el panel del administrador */}
                <Route path="/admin" element={<AdminPage />} />

                {/* Ruta para el panel del investigador */}
                <Route path="/researcher" element={<ResearcherPage />} />

                {/* Ruta para el panel del usuario */}
                <Route path="/user" element={<UserPage />} />

                {/* Ruta codificada que redirige */}
                <Route path="/route/:encodedRoute" element={<RouteRedirect />} />

                {/* Ruta por defecto (Página principal con enlaces a las otras páginas) */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '28px',
        marginBottom: '40px',
        color: '#2c3e50',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    link: {
        textDecoration: 'none',
    },
};

export default App;
