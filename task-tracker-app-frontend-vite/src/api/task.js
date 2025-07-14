const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async (setIsLogin) => {
	try {
		const token = localStorage.getItem("token");

		if (!token) {
			if (typeof setIsLogin === "function") setIsLogin(false);
			return { error: "No token found" };
		}

		const response = await fetch(API_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		// Handle auth-related errors
		if (response.status === 401 || response.status === 403) {
			localStorage.removeItem("token");
			if (typeof setIsLogin === "function") setIsLogin(false);
			return { error: "Unauthorized or token expired" };
		}

		// Handle other non-OK responses
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return {
				error:
					errorData.message ||
					`Error: ${response.status} ${response.statusText}`,
			};
		}

		// Parse response
		const data = await response.json();
		return data;
	} catch (err) {
		console.error("Fetch error:", err);
		return { error: "Network or server error occurred" };
	}
};

export const onToggle = async (id) => {
	try {
		const response = await fetch(`${API_URL}/toggle/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			return {
				error:
					errorData.message ||
					`Error: ${response.status} ${response.statusText}`,
			};
		}

		return await response.json();
	} catch (err) {
		console.error("Fetch error:", err);
		return { error: "Network or server error occurred" };
	}
};

export const addTasks = async (text) => {
	const response = await fetch(`${API_URL}/add`, {
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
	const response = await fetch(`${API_URL}/update/${id}`, {
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
	const response = await fetch(`${API_URL}/delete/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	return await response.json();
};
