const { Schema, model } = require('mongoose');

const ProductoSeleccionadoSchema = Schema({
	name: {
		type: String,
		required: true,
	},

	precio: {
		type: String,
		required: true,
	},

	cantidad: {
		type: String,
		required: true,
	},

	descripcion: {
		type: String,
		required: true,
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

module.exports = model('ProductoSeleccionado', ProductoSeleccionadoSchema);
