const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	// return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
	// 	expiresIn: "1d",
	// });

	return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};

module.exports = { generateToken };
