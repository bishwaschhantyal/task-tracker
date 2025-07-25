const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Please log in" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};

module.exports = authenticateJWT;
