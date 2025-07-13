const API_URL = "http://localhost:5000/api/auth";
const GOOGLE_URL = "http://localhost:5000/api/auth/google/";

const handleResponse = async (response) => {
	const data = await response.json();

	if (!response.ok) {
		// This assumes your backend returns { error: "some message" }
		const message = data.error || data.message || "Something went wrong";
		throw new Error(message);
	}

	return data;
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

export const googleLogin = () => {
	window.location.href = GOOGLE_URL;
};
