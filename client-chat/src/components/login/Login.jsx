import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token); // Almacena el token en localStorage
            onLogin(); // Notifica que el usuario ha iniciado sesión
            setMessage('Inicio de sesión exitoso');
            navigate('/chat'); // Redirige al componente Chat
        } catch (error) {
            setMessage('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesión</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
