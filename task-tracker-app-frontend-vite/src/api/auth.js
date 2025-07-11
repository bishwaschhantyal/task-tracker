const API_URL = "http://localhost:5000/api/auth";

const handleResponse = async (response) => {
	// if (!response.ok) {
	// 	const errorData = await response.json();
	// 	throw new Error(errorData.error || "Something went wrong");
	// }
	return await response.json();
};

export const loginUser = async (data) => {
	const response = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return handleResponse(response);
};

export const registerUser = async (data) => {
	const response = await fetch(`${API_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return handleResponse(response);
};

export const logoutUser = async () => {
	const response = await fetch(`${API_URL}/logout`, {
		method: "POST",
	});
	return handleResponse(response);
};
