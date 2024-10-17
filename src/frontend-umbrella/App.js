import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage/page';
import ResearcherPage from './pages/ResearcherPage/page';
import UserPage from './pages/UserPage/page';
import LoginPage from './components/auth/LoginPage'; // Componente de login
import RegisterPage from './components/auth/RegisterPage'; // Componente de registro
import AuthService from './services/authService'; // Servicio de autenticación

// Componente para proteger las rutas según la autenticación
function ProtectedRoute({ roleRequired, children }) {
    const role = AuthService.getCurrentUserRole();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!AuthService.isAuthenticated() || role !== roleRequired) {
            navigate('/login'); // Redirigir al login si no está autenticado o no tiene el rol requerido
        }
    }, [role, roleRequired, navigate]);

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta para el panel del administrador */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta para el panel del investigador */}
                <Route
                    path="/researcher"
                    element={
                        <ProtectedRoute roleRequired="researcher">
                            <ResearcherPage />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta para el panel del usuario */}
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute roleRequired="user">
                            <UserPage />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta de login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Ruta de registro */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Ruta por defecto redirige a la página de login */}
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
