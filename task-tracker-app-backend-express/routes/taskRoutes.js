const express = require("express");
const {
	getTasks,
	addTask,
	updateTask,
	deleteTask,
	onToggle,
} = require("../controllers/taskController");
const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, getTasks);
router.post("/add", authenticateJWT, addTask);
router.put("/update/:id", authenticateJWT, updateTask);
router.put("/toggle/:id", authenticateJWT, onToggle);
router.delete("/delete/:id", authenticateJWT, deleteTask);

module.exports = router;
