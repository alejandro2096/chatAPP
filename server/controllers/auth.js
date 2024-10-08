const { response } = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const userCreation = async (req, res = response) => {
	const { name, username, password, role } = req.body;

    try {
        //* Verifica si el usuario ya existe
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        //* Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //* Crea un nuevo usuario
        const newUser = new UserModel({ name, username, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

const userLogin = async (req, res = response) => {
	const { username, password } = req.body;

    try {
        //* Verifica si el usuario existe
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        //* Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        //* Genera un token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

        res.json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};


module.exports = {
	userCreation,
	userLogin,
};
