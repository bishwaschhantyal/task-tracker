const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
	const response = await fetch(API_URL, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	if (!response.ok) throw new Error("Failed to fetch tasks");
	return await response.json();
};

export const addTasks = async (text) => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ text }),
	});
	return await response.json();
};

export const updateTasks = async (id, newTask) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ text: newTask }),
	});

	return await response.json();
};

export const deleteTasks = async (id) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	return await response.json();
};
