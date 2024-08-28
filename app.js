import dotenv from "dotenv";
dotenv.config({
	path: "./.env",
});
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use(cors());

import formRouter from "./src/routes/form.route.js";

app.use("/api/form", formRouter);

export default app;
