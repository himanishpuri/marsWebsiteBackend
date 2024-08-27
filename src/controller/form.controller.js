import asyncHandler from "express-async-handler";
import Form from "../models/form.model.js";

export const formDetails = asyncHandler(async function (req, res, next) {
	try {
		if (!req?.studentInfo) {
			res.status(409);
			throw new Error("Details not found");
		}

		const studentInfo = req.studentInfo;

		let form = await Form.findOne({
			$or: [
				{ email: studentInfo?.email },
				{ phoneNo: studentInfo?.phoneNo },
				{ rollNo: studentInfo?.rollNo },
			],
		});

		if (form) {
			res.status(409);
			throw new Error("Student already exists");
		}

		form = await Form.create({ ...studentInfo });

		if (!form) {
			res.status(400);
			throw new Error("Form not created");
		}

		form = form.toObject();
		delete form.__v;
		delete form._id;
		delete form.createdAt;
		delete form.updatedAt;

		return res.status(201).json({
			data: form,
			success: true,
		});
	} catch (error) {
		res.json({ success: false, error, message: error?.message });
	}
});
