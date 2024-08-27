import express from "express";
const router = express.Router();

import { formDetails } from "../../controller/form.controller.js";
import { checkFormDetails } from "../middlewares/form.middleware.js";

router.post("/register", checkFormDetails, formDetails);

export default router;
