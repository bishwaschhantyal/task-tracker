import React, { useId } from "react";

const Input = ({ className, setNewTask, newTask }) => {
	const id = useId();
	return (
		<input
			id={id}
			value={newTask}
			type="text"
			placeholder="Enter task here..."
			onChange={(e) => setNewTask(e.target.value)}
			className={`${className} p-2 border-1 border-blue-600 rounded-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark: dark:ring-offset-gray-800 focus:ring-offset-1`}
		/>
	);
};

export default Input;
