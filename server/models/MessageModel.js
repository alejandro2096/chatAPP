const mongoose = require('mongoose');

const messageModelSchema = new mongoose.Schema({
    user: { type: String, required: true },  //* Puede ser el nombre de usuario o el ID del usuario.
    message: { type: String, required: true },
    role: { type: String, enum: ['student', 'moderator'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageModel', messageModelSchema);
