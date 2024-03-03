const { body } = require('express-validator');
const { validateChecks } = require('../middlewares/validate');

const validateRegister = validateChecks([
	body('firstName')
		.isLength({ min: 3, max: 50 })
		.notEmpty()
		.withMessage('El nombre de usuario es requerido'),
	body('lastName')
		.isLength({ min: 3, max: 50 })
		.notEmpty()
		.withMessage('El apellido de usuario es requerido'),
	body('email')
		.notEmpty()
		.isEmail()
		.withMessage('Debe ser un correo electrónico válido'),
	body('password')
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage('La contraseña debe tener al menos 5 caracteres'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Las contraseñas no coinciden');
		}
		return true;
	}),
]);

const validateLogin = validateChecks([
	body('email')
		.notEmpty()
		.isEmail()
		.withMessage('Debe ser un correo electrónico válido'),
	body('password').notEmpty().withMessage('La contraseña es requerida'),
]);

module.exports = { validateRegister, validateLogin };
