const jwt = require('jsonwebtoken');

function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
}

module.exports = createAccessToken;
