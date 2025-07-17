import Button from "./Button";
import { useState, useEffect } from "react";

const Task = ({ task, deleteTask, onToggleComplete, updateTask }) => {
	const [updatedTask, setUpdatedTask] = useState(task.title);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setUpdatedTask(task.title);
	}, [task.title]);

	return (
		<li
			key={task._id}
			className="py-3 flex items-center justify-between">
			<div className="flex items-center flex-grow dark:text-white">
				<input
					id={`checkbox-${task._id}`}
					type="checkbox"
					checked={task.completed}
					onChange={() => onToggleComplete(task._id)}
					className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
				/>

				<input
					id={`input-${task._id}`}
					type="text"
					value={updatedTask}
					onChange={(e) => setUpdatedTask(e.target.value)}
					className={`${isEditing ? "border border-gray-300" : "border-none"} ${
						task.completed ? "text-gray-400 line-through" : ""
					} ml-3 rounded px-2 py-1 flex-grow focus:outline-none`}
					readOnly={!isEditing}
					disabled={!isEditing && task.completed}
				/>
			</div>

			<div className="flex space-x-2">
				{!isEditing ? (
					<>
						<button
							className={`text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 ml-4 ${
								task.completed
									? "bg-gray-400 cursor-not-allowed"
									: "bg-yellow-500 hover:bg-yellow-600"
							}`}
							disabled={task.completed}
							onClick={() => {
								if (!task.completed) setIsEditing(true);
							}}>
							Edit
						</button>
						<Button
							type="delete"
							onClick={() => {
								deleteTask(task._id);
							}}
							isCompleted={task.completed}
						/>
					</>
				) : (
					<button
						onClick={() => {
							updateTask(task._id, updatedTask);
							setIsEditing(!isEditing);
						}}
						className="text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 ml-4 bg-green-600 hover:bg-green-800">
						Save
					</button>
				)}
			</div>
		</li>
	);
};

export default Task;
