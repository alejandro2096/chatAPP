import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login'); // Redirige al usuario al login después de cerrar sesión
    };

    return (
        <button onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
