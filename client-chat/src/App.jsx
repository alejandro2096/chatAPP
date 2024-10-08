import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/menu/Navbar';
import LogoutButton from './components/buttons/LogoutButton';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Register from './components/register/Register';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {!isAuthenticated && <Navbar />}

            {/* Renderiza LogoutButton cuando está autenticado */}
            {isAuthenticated && <LogoutButton onLogout={handleLogout} />}

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/chat"
                    element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/chat" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
