const bcrypt = require("bcryptjs");

const users = [
	{
		id: "1",
		name: "User",
		email: "user@example.com",
		password: bcrypt.hashSync("password123", 10), // Hashed password
		role: "user",
	},
];

module.exports = users;
