const express = require("express");
const passport = require("passport");
const {
	loginUser,
	registerUser,
	logoutUser,
	googleCallback,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

// Google OAuth
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/google/callback",
	passport.authenticate("google", { session: false }),
	googleCallback
);

module.exports = router;
