import dotenv from "dotenv";
dotenv.config({
	path: "./.env",
});
import app from "./app.js";
import ConnectDB from "./src/database/dbConfig.js";

const PORT = process.env.PORT || 3000;

ConnectDB()
	.then(() => {
		app.on("error", (error) => {
			console.error(`Error in starting server: ${error}`);
		});

		app.listen(PORT, () => {
			console.log("Server running on", PORT);
		});
	})
	.catch((error) => {
		console.error(`Error connecting to database: ${error}`);
		process.exit(1);
	});
