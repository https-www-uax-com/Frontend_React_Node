import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage/page';
import ResearcherPage from './pages/ResearcherPage/page';
import UserPage from './pages/UserPage/page';

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

                {/* Ruta por defecto */}
                <Route path="/" element={<h1>Bienvenido al Sistema de Gestión de Experimentación Biológica</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;