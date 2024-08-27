import mongoose from "mongoose";

export default async function ConnectDB() {
	try {
		const DBResponse = await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		});
		console.log(`Database connected to ${DBResponse.connection.name}`);
	} catch (error) {
		console.error(`Error connecting to database: ${error}`);
		process.exit(1);
	}
}
