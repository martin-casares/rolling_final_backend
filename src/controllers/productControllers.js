const Producto = require('../models/productModel');

const getProductos = async (req, res) => {
	try {
		const productos = await Producto.find();
		res.status(200).json(productos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createProducto = async (req, res) => {
	try {
		const { name, precio, cantidad, descripcion } = req.body;

		const productoExistente = await Producto.findOne({ name });
		if (productoExistente) {
			return res.status(400).json({ message: 'El producto ya existe' });
		}

		const nuevoProducto = new Producto({
			name,
			precio,
			cantidad,
			descripcion,
		});

		const productoGuardado = await nuevoProducto.save();
		res.json(productoGuardado);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProductoById = async (req, res) => {
	try {
		const producto = await Producto.findById(req.params.id);
		if (!producto) return res.status(404).json({ message: 'El producto no existe.' });
		res.status(200).json(producto);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateProducto = async (req, res) => {
	try {
		const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!producto)
			return res.status(400).json({ message: 'No existe un producto con ese ID' });

		res.status(200).json({ message: 'Producto actualizado correctamente.', producto });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteProducto = async (req, res) => {
	try {
		const productoDelete = await Producto.findById(req.params.id);
		if (!productoDelete) {
			return res
				.status(400)
				.json({ message: 'No existe ningún producto con ese ID.' });
		}

		await Producto.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Producto Eliminado!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getProductos,
	createProducto,
	getProductoById,
	updateProducto,
	deleteProducto,
};
