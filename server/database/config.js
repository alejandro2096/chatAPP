const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect("mongodb+srv://devalejandromolina22:smdmnUNOzU4VmamV@clusterchatapp.s2zd4.mongodb.net/");
		console.log('Db online');
	} catch (error) {
		console.log(error);
		throw new Error('Error al inicializar la base de datos');
	}
};

module.exports = {
	dbConnection,
};
