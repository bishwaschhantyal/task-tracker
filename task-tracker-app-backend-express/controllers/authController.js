const bcrypt = require("bcryptjs");
const users = require("../users");
const { generateToken } = require("../utils/tokenUtils");

exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	const user = users.find((u) => u.email === email);

	if (!user || !bcrypt.compareSync(password, user.password)) {
		return res.status(401).json({ error: "Wrong email or password" });
	}

	const token = generateToken(user);
	res.json({ token, message: "Login successful" });
};

exports.registerUser = async (req, res) => {
	console.log(req.body);

	const { name, email, password } = req.body;
	const existingUser = users.find((u) => u.email === email);

	if (existingUser) {
		return res.status(401).json({ error: "User already exists" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = {
			id: String(users.length + 1),
			user: name,
			email,
			password: hashedPassword,
			role: "user",
		};

		users.push(newUser);

		const token = generateToken(newUser);

		res.status(201).json({ message: "User registered", token });
	} catch (err) {
		res.status(500).json({ error: "Error registering user" });
	}
};

exports.logoutUser = (req, res) => {
	res.json({
		message: "Logout successful. Please clear the token on the client side.",
	});
};

exports.googleCallback = (req, res) => {
	const user = req.user;
	const token = generateToken(user);
	res.redirect(`http://localhost:5173/auth/success?token=${token}`);
};
