const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const register = async (req, res) => {
	try {
		const { email, firstName, lastName, rol, password, confirmPassword, avatar } =
			req.body;

		const userFound = await User.findOne({ email });
		if (userFound) return res.status(400).json(['El email ya esta en uso']);

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Las contraseñas no coinciden!' });
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new User({
			firstName,
			lastName,
			email,
			rol,
			avatar,
			password: passwordHash,
		});

		const userSaved = await newUser.save();

		const payload = {
			id: userSaved._id,
			firstName: userSaved.firstName,
			lastName: userSaved.lastName,
			email: userSaved.email,
			rol: userSaved.rol,
			avatar: userSaved.avatar,
		};

		/* 		const payload = {
			firstName: userSaved.firstName,
			rol: userSaved.rol,
			id: userSaved._id,
		}; */
		const token = jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: '1d',
		});

		res.status(201).json({
			message: 'Usuario Registrado!',
			token,
			id: userSaved._id,
			firstName: userSaved.firstName,
			lastName: userSaved.lastName,
			email: userSaved.email,
			rol: userSaved.rol,
			avatar: userSaved.avatar,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const userFound = await User.findOne({ email });
		if (!userFound)
			return res.status(400).json({ message: 'Usuario no Encontrado!' });

		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch)
			return res.status(400).json({ message: 'Credenciales Incorrectas!' });

		const payload = {
			email: userFound.email,
			rol: userFound.rol,
			id: userFound._id,
		};
		const token = jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: '1d',
		});
		req.user = userFound;

		res.json({
			message: 'Usuario Logeado!',
			token,
			id: userFound._id,
			firstName: userFound.firstName,
			lastName: userFound.lastName,
			email: userFound.email,
			rol: userFound.rol,
			avatar: userFound.avatar,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const logout = (req, res) => {
	res.cookie('token', '', {
		expires: new Date(0),
	});
	return res.sendStatus(200);
};

module.exports = {
	register,
	login,
	logout,
};
