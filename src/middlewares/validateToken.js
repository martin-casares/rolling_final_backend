const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
	//recibimos el token atravez de los header y definimos un nombre
	const token = req.header('x-token');

	//si no recibimos un token, ejemplo lo borraron tiramos un error
	if (!token) {
		return res.status(401).json({
			message: 'No hay token en la peticion',
		});
	}

	try {
		//verificamos si el token aun es valido si es valido cumple y llama a next
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		req.user = payload;
		next();
	} catch (error) {
		//si el token es invalido cae aca, en caso que se vencio
		return res.status(401).json({
			message: 'Token no valido',
		});
	}
};

module.exports = { validarJWT };
