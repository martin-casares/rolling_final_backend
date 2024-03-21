const Producto = require('../model/producto-model');
const Usuario = require('../model/usuario-model');

const crearProducto = async (req, res) => {
	try {
		let producto = new Producto(req.body);

		await producto.save();

		res.status(201).json({
			ok: true,
			msg: 'producto creado',
			producto,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: true,
			msg: 'Hable con el administrador',
		});
	}
};

const cargarProductos = async (req, res) => {
	try {
		const productos = await Producto.find();

		res.status(200).json({
			ok: true,
			productos,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};


const cargarUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.find();

		res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const productoEliminar = await Producto.findById(req.params.id);

		if (!productoEliminar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe un producto con este ID',
			});
		}

		await Producto.findByIdAndDelete(req.params.id);

		res.status(200).json({
			ok: true,
			msg: 'Producto Eliminado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

const editarProducto = async (req, res) => {
	try {
		const productoEditar = await Producto.findById(req.body._id);

		if (!productoEditar) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe ningun Producto con este Id',
			});
		}

		await Producto.findByIdAndUpdate(req.body._id, req.body);

		res.status(200).json({
			ok: true,
			msg: 'producto editado',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

module.exports = {
	crearProducto,
	cargarProductos,
	cargarUsuarios,
	eliminarProducto,
	editarProducto,
};