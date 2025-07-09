const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const users = require("./users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = 5000;
const JWT_SECRET = "secretKey123@";

app.use(cors());
app.use(express.json());

let tasks = [
	{
		id: uuidv4(),
		text: "Learn React",
		completed: false,
	},
	{
		id: uuidv4(),
		text: "Build Express Api",
		completed: false,
	},
	{
		id: uuidv4(),
		text: "Connect Frontend to Backend",
		completed: false,
	},
];

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Please log in" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const user = jwt.verify(token, JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return res.status(403).json({ message: "Invalid or expired token" });
	}
};

app.get("/", (req, res) => {
	res.send("Hello from express backend, Backend is up and running");
});

app.get("/api/tasks", authenticateJWT, (req, res) => {
	res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {
	const newTask = {
		id: uuidv4(),
		text: req.body.text,
		completed: false,
	};

	tasks.push(newTask);

	res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
	const taskId = req.params.id;
	const updatedTask = req.body.text;

	tasks = tasks.map((task) =>
		task.id === taskId ? { ...task, text: updatedTask } : task
	);

	const updatedTasks = tasks.find((task) => task.id === taskId);

	res
		.status(200)
		.json({ task: updatedTasks, message: "task suceessfully updated" });
});

app.delete("/api/tasks/:id", (req, res) => {
	const taskId = req.params.id;

	tasks = tasks.filter((task) => task.id !== taskId);

	res.status(200).json(tasks, { message: "task suceessfully deleted" });
});

//login route
app.post("/api/auth/login", (req, res) => {
	const { email, password } = req.body;
	const user = users.find((u) => u.email === email);

	if (!user || !bcrypt.compareSync(password, user.password)) {
		return res.status(401).json({ message: "Wrong email or password" });
	}

	const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: "15m",
	});

	res.json({ token, message: "Login successful" });
});

app.post("/api/auth/register", async (req, res) => {
	const { email, password } = req.body;
	const user = users.find((u) => u.email === email);

	if (user) {
		return res.status(401).json({ message: "User already exist" });
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = {
			id: users.length,
			email,
			// password: bcrypt.hashSync(password, salt),
			password: hashedPassword,
			role: "user",
		};

		users.push(newUser);

		const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
			expiresIn: "15m",
		});

		console.log(users);

		res.status(201).json({ message: "User registered", token });
	} catch (err) {
		res.status(500).json({ error: "Error registering user" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
