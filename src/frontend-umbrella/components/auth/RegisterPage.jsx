import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [lastName1, setLastName1] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Definir el estado de carga
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true); // Establecer el estado de carga a verdadero

        // Validaciones de campos vacíos
        if (!name || !lastName1 || !email || !password || !phone || !address) {
            setError('Por favor complete todos los campos.');
            setLoading(false); // Establecer el estado de carga a falso si hay un error
            return;
        }

        try {
            await AuthService.register({
                nombre: name,
                apellido1: lastName1,
                apellido2: lastName2,
                correo: email,
                contrasena: password,
                telefono: phone,
                direccion: address,
                role,
            });
            setSuccess('Usuario registrado con éxito');
            navigate('/login'); // Redirige al login después de un registro exitoso
        } catch (err) {
            setError('Error durante el registro. Intente nuevamente.');
        } finally {
            setLoading(false); // Establecer el estado de carga a falso después de completar la solicitud
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registrar Cuenta</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Primer Apellido"
                    value={lastName1}
                    onChange={(e) => setLastName1(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Segundo Apellido"
                    value={lastName2}
                    onChange={(e) => setLastName2(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="researcher">Investigador</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>

                <p className="login-link">
                    ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
                </p>
            </form>

            <style>{`
                .register-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                }

                .register-form {
                    background-color: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    width: 400px;
                }

                h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #2c3e50;
                }

                input, select {
                    margin-bottom: 15px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 16px;
                }

                button {
                    padding: 10px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 18px;
                    cursor: pointer;
                }

                button:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }

                .error {
                    color: red;
                    text-align: center;
                    margin-bottom: 10px;
                }

                .success {
                    color: green;
                    text-align: center;
                    margin-bottom: 10px;
                }

                .login-link {
                    text-align: center;
                    margin-top: 20px;
                }

                .login-link a {
                    color: #3498db;
                    text-decoration: none;
                }

                .login-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
