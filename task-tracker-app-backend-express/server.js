const app = require("./app");
const { dbConnect } = require("./config/db");

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});
