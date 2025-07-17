const { v4: uuidv4 } = require("uuid");
const Task = require("../models/Task");

// let tasks = [
// 	{ id: uuidv4(), text: "Learn React", completed: false },
// 	{ id: uuidv4(), text: "Build Express API", completed: false },
// 	{ id: uuidv4(), text: "Connect Frontend to Backend", completed: false },
// ];

// exports.getTasks = (req, res) => {
// 	res.json(tasks);
// };

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.id });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: "Error fetching tasks" });
	}
};

// exports.addTask = (req, res) => {
// 	const newTask = {
// 		id: uuidv4(),
// 		text: req.body.text,
// 		completed: false,
// 	};
// 	tasks.push(newTask);
// 	res.status(201).json(newTask);
// };

exports.addTask = async (req, res) => {
	try {
		const newTask = new Task({
			title: req.body.text,
			user: req.user.id,
		});
		await newTask.save();
		res.status(201).json(newTask);
	} catch (err) {
		res.status(500).json({ error: "Error creating task" });
	}
};

// exports.onToggle = (req, res) => {
// 	const taskId = req.params.id;

// 	// Check if taskId is provided
// 	if (!taskId) {
// 		return res.status(400).json({ error: "Task ID is required" });
// 	}

// 	let taskFound = false;

// 	tasks = tasks.map((task) => {
// 		if (task.id === taskId) {
// 			taskFound = true;
// 			return { ...task, completed: !task.completed };
// 		}
// 		return task;
// 	});

// 	console.log(tasks);

// 	if (!taskFound) {
// 		return res.status(404).json({ error: "Task not found" });
// 	}

// 	return res.status(200).json({ message: "Task status toggled successfully" });
// };

exports.onToggle = async (req, res) => {
	const taskId = req.params.id;

	if (!taskId) {
		return res.status(400).json({ error: "Task ID is required" });
	}

	try {
		// Find the task by ID
		const task = await Task.findById(taskId);

		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}

		// Toggle the `completed` status
		task.completed = !task.completed;
		await task.save();

		res.status(200).json({
			message: "Task status toggled successfully",
			task,
		});
	} catch (err) {
		console.error("Toggle Error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

// exports.updateTask = (req, res) => {
// 	const taskId = req.params.id;
// 	const updatedText = req.body.text;

// 	tasks = tasks.map((task) =>
// 		task.id === taskId ? { ...task, text: updatedText } : task
// 	);

// 	const updatedTask = tasks.find((task) => task.id === taskId);
// 	res
// 		.status(200)
// 		.json({ task: updatedTask, message: "Task successfully updated" });
// };

exports.updateTask = async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.text,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.status(200).json({
			message: "Task successfully updated",
			task: updatedTask,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// exports.deleteTask = (req, res) => {
// 	const taskId = req.params.id;
// 	tasks = tasks.filter((task) => task.id !== taskId);
// 	res.status(200).json({ message: "Task successfully deleted", tasks });
// };

exports.deleteTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const deletedUser = await Task.findByIdAndDelete(taskId);
		if (!deletedUser)
			return res.status(404).json({ message: "Task not found" });

		res.json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ error: err.message });
	}
};
