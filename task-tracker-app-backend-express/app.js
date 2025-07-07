const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const PORT = 5000;

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

app.get("/", (req, res) => {
	res.send("Hello from express backend, Backend is up and running");
});

app.get("/api/tasks", (req, res) => {
	console.log(tasks);

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

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
