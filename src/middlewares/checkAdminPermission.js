const checkAdminPermission = (req, res, next) => {
	if (req.user && (req.user.rol === 'admin' || req.user.rol === 'Admin')) {
		next();
	} else {
		res.status(403).send({
			status: 'error',
			payload: 'No tienes permiso para realizar ésta acción!',
		});
	}
};

module.exports = { checkAdminPermission };
