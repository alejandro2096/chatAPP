import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';

// Conexión al servidor en el puerto 4000
const socket = io('http://localhost:4000', {
    auth: { token: localStorage.getItem('token') },
    forceNew: true,
    transports: ["websocket"],
});


const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("Intentando conectar al servidor de Socket.IO...");

        socket.on('connect', () => {
            console.log("Cliente conectado a Socket.IO con ID:", socket.id);
        });

        socket.on('connect_error', (err) => {
            console.error("Error de conexión con Socket.IO:", err);
        });

        // Emitir evento para unirse al chat
        socket.emit('join_chat');
        console.log("Evento 'join_chat' emitido");

        socket.on('load_messages', (loadedMessages) => {
            console.log("Mensajes cargados desde el servidor:", loadedMessages);
            setMessages(loadedMessages);
        });

        socket.on('new_message', (newMessage) => {
            console.log("Nuevo mensaje recibido desde el servidor:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // return () => {
        //     console.log("Desconectando del servidor de Socket.IO...");
        //     socket.disconnect();
        // };
    }, []);


    const handleSendMessage = () => {
        const user = 'Usuario';
        console.log("Intentando enviar mensaje:", { user, message, role: 'student' });
        socket.emit('chat_message', { user, message, role: 'student' });
        console.log("Evento 'chat_message' emitido con datos:", { user, message, role: 'student' });
        setMessage('');
    };

    return (
        <div className='chat-container'>
            <div className='video-container'>
                <iframe
                    width='100%'
                    height='400'
                    src='https://www.youtube.com/embed/TpLKhDURaho'
                    title='Cristiano Ronaldo'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            </div>

            <div className='live-chat'>
                <h2>Chat en Vivo</h2>
                <div className='chat-box'>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.user}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Escribe tu mensaje'
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
