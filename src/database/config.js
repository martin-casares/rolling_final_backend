const mongoose = require('mongoose');

const dbConnetion = async () => {
	try {
		await mongoose.connect(process.env.URL_DB);
		console.log('DB Conected');
	} catch (error) {
		console.log(error);
	}
};

module.exports = { dbConnetion };
