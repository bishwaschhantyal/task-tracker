// config/db.js
const mongoose = require("mongoose");

const dbConnect = () =>
	mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log("MongoDB Connected"))
		.catch((err) => console.error("MongoDB Error:", err));

module.exports = { dbConnect };
