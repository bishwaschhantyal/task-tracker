const Button = ({ type, onClick, isCompleted }) => {
	const baseClasses =
		"text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-1";

	const styles = {
		add: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
		delete: `${
			isCompleted
				? "bg-red-500 hover:bg-red-600 focus:ring-red-400"
				: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 cursor-not-allowed"
		} `,
	};

	return (
		<button
			disabled={type === "delete" ? !isCompleted : isCompleted}
			className={`${baseClasses} ${styles[type] || styles.add}`}
			onClick={onClick}
			type="button">
			{type === "delete" ? "Delete Task" : "Add Task"}
		</button>
	);
};

export default Button;
