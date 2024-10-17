import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await AuthService.login(email, password);
            const { token, role } = response;

            if (role) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'researcher') {
                    navigate('/researcher');
                } else {
                    navigate('/user');
                }
            } else {
                setError('Role not recognized');
            }
        } catch (err) {
            setError(err.message || 'Error during login');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
                <p style={styles.text}>
                    ¿No tiene una cuenta?{' '}
                    <span style={styles.link} onClick={() => navigate('/register')}>
                        Cree una.
                    </span>
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    form: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    text: {
        marginTop: '20px',
        color: '#333',
    },
    link: {
        color: '#3498db',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};
