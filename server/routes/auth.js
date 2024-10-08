const express = require('express');
const { userCreation, userLogin } = require('../controllers/auth');

const router = express.Router();

//* Ruta de registro
router.post('/register', userCreation);


//* Ruta de inicio de sesión
router.post('/login', userLogin);



module.exports = router;
