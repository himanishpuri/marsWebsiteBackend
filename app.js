import dotenv from "dotenv";
dotenv.config({
	path: "./.env",
});
import express from "express";
import multer from "multer";

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

import formRouter from "./routes/form.route.js";

app.use("/api/form", formRouter);
