const MessageModel = require('../models/MessageModel');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join_chat', async () => {
            try {
                const messages = await MessageModel.find().sort({ timestamp: 1 });
                socket.emit('load_messages', messages);
            } catch (error) {
                console.error("Error al cargar mensajes:", error);
            }
        });

        socket.on('chat_message', async (data) => {
            console.log("Mensaje recibido en el servidor:", data);
            const { user, message, role } = data;

            const newMessage = new MessageModel({ user, message, role });
            await newMessage.save();

            io.emit('new_message', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
