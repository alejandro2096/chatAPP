const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'moderator'], required: true }
});

module.exports = mongoose.model('UserModel', userModelSchema);
