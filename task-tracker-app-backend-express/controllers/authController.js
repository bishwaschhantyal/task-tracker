const bcrypt = require("bcryptjs");
const users = require("../users");
const { generateToken } = require("../utils/tokenUtils");
const User = require("../models/User");

// exports.loginUser = (req, res) => {
// 	const { email, password } = req.body;
// 	const user = users.find((u) => u.email === email);

// 	if (!user || !bcrypt.compareSync(password, user.password)) {
// 		return res.status(401).json({ error: "Wrong email or password" });
// 	}

// 	const token = generateToken(user);
// 	res.json({ token, message: "Login successful" });
// };

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ error: "Wrong email or password" });
		}

		const token = generateToken(user);

		res.json({ token, message: "Login successful" });
	} catch (err) {
		res.status(500).json({ message: "Error during login" });
	}
};

// exports.registerUser = async (req, res) => {
// 	console.log(req.body);

// 	const { name, email, password } = req.body;
// 	const existingUser = users.find((u) => u.email === email);

// 	if (existingUser) {
// 		return res.status(401).json({ error: "User already exists" });
// 	}

// 	try {
// 		const hashedPassword = await bcrypt.hash(password, 10);
// 		const newUser = {
// 			id: String(users.length + 1),
// 			user: name,
// 			email,
// 			password: hashedPassword,
// 			role: "user",
// 		};

// 		users.push(newUser);

// 		const token = generateToken(newUser);

// 		res.status(201).json({ message: "User registered", token });
// 	} catch (err) {
// 		res.status(500).json({ error: "Error registering user" });
// 	}
// };

exports.registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const existingUser = await User.findOne({ email });

		console.log(existingUser);

		if (existingUser) {
			return res.status(409).json({ error: "User already exists" });
		}

		console.log(req.body);

		const newUser = new User({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		});

		await newUser.save();

		const token = generateToken(newUser);

		res.status(201).json({ token, message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ message: "Error registering user" });
	}
};

exports.logoutUser = (req, res) => {
	res.json({
		message: "Logout successful",
	});
};

exports.googleCallback = (req, res) => {
	const user = req.user;
	const token = generateToken(user);
	res.redirect(
		`https://task-tracker-b.netlify.app/auth/success?token=${token}`
	);
};
