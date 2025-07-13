export const authFetch = async (url, options = {}) => {
	const token = localStorage.getItem("token");

	const headers = {
		...options.headers,
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};

	const response = await fetch(url, {
		...options,
		headers,
	});

	// Handle 401/403 responses
	if (response.status === 401 || response.status === 403) {
		localStorage.removeItem("token");
		return { error: "Token expired or unauthorized" };
	}

	return response;
};
