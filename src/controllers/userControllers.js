const User = require('../models/userModel.js');

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password, rol } = req.body;

		const userFound = await User.findOne({ email });
		if (userFound) {
			return res.status(400).json({ message: 'El email ya está en uso' });
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			rol,
		});

		const savedUser = await newUser.save();
		res.json(savedUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: 'El usuario no existe.' });
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!user)
			return res.status(400).json({ message: 'No existe un usuario con ese ID' });

		res.status(200).json({ message: 'Usuario actualizado correctamente.', user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const userDelete = await User.findById(req.params.id);
		if (userDelete == undefined) {
			return res
				.status(400)
				.json({ message: 'No existe ningún usuario con ese ID.' });
		}

		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Usuario Eliminado!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
