import Button from "./components/Button";
import Input from "./components/Input";
import TaskList from "./components/TaskList";
import { fetchTasks, addTasks, updateTasks, deleteTasks } from "./api/task";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "./contexts/AuthContext";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { isLogin } = useAuth();

	useEffect(() => {
		const initializeApp = async () => {
			try {
				const fetchAllTasks = await fetchTasks();
				setTasks(fetchAllTasks);
				setWelcomeMessage("Welcome to your task tracker!");
				const timer = setTimeout(() => setWelcomeMessage(""), 3000);

				return () => clearTimeout(timer);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		initializeApp();
	}, []);

	// useEffect(() => {
	// 	const storedTasks = JSON.parse(localStorage.getItem("tasks"));

	// 	if (storedTasks && storedTasks.length > 0) setTasks(storedTasks);
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("tasks", JSON.stringify(tasks));

	// 	console.log(tasks);
	// }, [tasks]);

	const addTask = () => {
		if (newTask.trim()) {
			addTasks(newTask)
				.then((task) => {
					setTasks((prevTasks) => [...prevTasks, task]);
				})
				.catch(() => {
					setError("Failed to add task");
				});

			setNewTask("");
		} else {
			setError("Task cannot be empty");
		}
	};

	const onToggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const deleteTask = (id) => {
		const taskToDelete = tasks.find((task) => task.id === id);

		if (!taskToDelete) {
			setError("Task not found");
			return;
		}

		if (!taskToDelete.completed) {
			setError("Cannot delete without completing task");
			return;
		}

		deleteTasks(id)
			.then(() => {
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			})
			.catch((error) => {
				setError("Failed to delete task");
			});
	};

	const updateTask = (id, updatedTask) => {
		updateTasks(id, updatedTask)
			.then((res) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === id ? { ...task, text: updatedTask } : task
					)
				);
			})
			.catch(() => {
				setError("Failed to update task");
			});
	};

	if (loading) return <p className="text-gray-700 p-4">Loading tasks...</p>;

	return (
		<>
			{isLogin ? (
				<main className="container mx-auto my-8 flex-grow p-4">
					{welcomeMessage && (
						<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
							<p>{welcomeMessage}</p>
						</div>
					)}

					{error && (
						<div className="flex items-center justify-between bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
							<p>{error}</p>
							<button onClick={() => setError(null)}>
								<RxCross2 />
							</button>
						</div>
					)}
					<h2 className="text-xl font-bold mb-4 text-gray-800">Dashboard</h2>

					<div className="flex space-x-4 mb-5">
						<Input
							className={"flex-grow"}
							setNewTask={setNewTask}
							newTask={newTask}
						/>
						<Button
							type="add"
							onClick={() => {
								addTask();
							}}
						/>
						{/* <Button type="delete" onClick={() => alert("Task Delete")} /> */}
					</div>

					<TaskList
						tasks={tasks}
						onToggleComplete={onToggleComplete}
						deleteTask={deleteTask}
						updateTask={updateTask}
					/>
				</main>
			) : (
				<p className="container mx-auto py-8 flex-grow text-gray-700 text-xl">
					Please login to see and add task
				</p>
			)}
		</>
	);
}

export default App;
