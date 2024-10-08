import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate para la redirección

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', {
                name,
                username,
                password,
                role,
            });
            setMessage(response.data.message);
            // Redirige al usuario al login después del registro exitoso
            navigate('/login');
        } catch (error) {
            setMessage('Error en el registro');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Registro</h2>
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '106%' }} >
                    <option value="student">Estudiante</option>
                    <option value="moderator">Moderador</option>
                </select>
                <button type="submit">Registrarse</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;
