const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config({ quiet: true });
require("./config/passport");

const app = express();

// ✅ CORS config
const allowedOrigins = [
	"http://localhost:5173",
	"https://task-tracker-b.netlify.app",
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);

// ✅ Handle preflight OPTIONS requests globally
app.options(
	"*",
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

// ✅ Make sure it's above all routes
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
