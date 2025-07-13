const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const users = require("../users");
const bcrypt = require("bcryptjs");

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		(accessToken, refreshToken, profile, done) => {
			let user = users.find((u) => u.email === profile.emails[0].value);

			if (!user) {
				user = {
					id: String(users.length + 1),
					user: profile.displayName,
					email: profile.emails[0].value,
					password: bcrypt.hashSync("google-auth", 10),
					role: "user",
				};
				users.push(user);
			}
			return done(null, user);
		}
	)
);
