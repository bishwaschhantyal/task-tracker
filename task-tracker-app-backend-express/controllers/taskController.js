const { v4: uuidv4 } = require("uuid");

let tasks = [
	{ id: uuidv4(), text: "Learn React", completed: false },
	{ id: uuidv4(), text: "Build Express API", completed: false },
	{ id: uuidv4(), text: "Connect Frontend to Backend", completed: false },
];

exports.getTasks = (req, res) => {
	res.json(tasks);
};

exports.addTask = (req, res) => {
	const newTask = {
		id: uuidv4(),
		text: req.body.text,
		completed: false,
	};
	tasks.push(newTask);
	res.status(201).json(newTask);
};

exports.onToggle = (req, res) => {
	const taskId = req.params.id;

	// Check if taskId is provided
	if (!taskId) {
		return res.status(400).json({ error: "Task ID is required" });
	}

	let taskFound = false;

	tasks = tasks.map((task) => {
		if (task.id === taskId) {
			taskFound = true;
			return { ...task, completed: !task.completed };
		}
		return task;
	});

	console.log(tasks);

	if (!taskFound) {
		return res.status(404).json({ error: "Task not found" });
	}

	return res.status(200).json({ message: "Task status toggled successfully" });
};

exports.updateTask = (req, res) => {
	const taskId = req.params.id;
	const updatedText = req.body.text;

	tasks = tasks.map((task) =>
		task.id === taskId ? { ...task, text: updatedText } : task
	);

	const updatedTask = tasks.find((task) => task.id === taskId);
	res
		.status(200)
		.json({ task: updatedTask, message: "Task successfully updated" });
};

exports.deleteTask = (req, res) => {
	const taskId = req.params.id;
	tasks = tasks.filter((task) => task.id !== taskId);
	res.status(200).json({ message: "Task successfully deleted", tasks });
};
