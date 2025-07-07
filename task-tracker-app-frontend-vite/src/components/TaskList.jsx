import Task from "./Task";

const TaskList = ({ tasks, deleteTask, onToggleComplete, updateTask }) => {
	return (
		<div className="space-y-2">
			{tasks.length === 0 ? (
				<p className="text-gray-500">No tasks yet. Add one above</p>
			) : (
				<ul className="divide-y divide-gray-200">
					{tasks.map((task, idx) => (
						<Task
							key={idx}
							task={task}
							deleteTask={deleteTask}
							onToggleComplete={onToggleComplete}
							updateTask={updateTask}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default TaskList;
