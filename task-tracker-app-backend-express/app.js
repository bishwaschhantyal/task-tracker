const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config({ quiet: true });
require("./config/passport");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173", "https://task-tracker-b.netlify.app"],
		credentials: true,
	})
);
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
	res.send("Backend is up and running");
});

module.exports = app;
