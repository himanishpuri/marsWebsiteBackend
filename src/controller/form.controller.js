import asyncHandler from "express-async-handler";
import Form from "../models/form.model.js";

export const formDetails = asyncHandler(async function (req, res, next) {
	try {
		if (!req?.userInfo) {
			res.status(409);
			throw new Error("Details not found");
		}

		const userInfo = req.userInfo;

		let form = await Form.findOne({
			$or: [
				{ email: userInfo?.email },
				{ phoneNo: userInfo?.phoneNo },
				{ rollNo: userInfo?.rollNo },
			],
		});

		if (form) {
			return res.status(200).json({
				data: form,
			});
		}
		form = await Form.create({
			...req?.userInfo,
		});

		if (!form) {
			res.status(400);
			throw new Error("Form not created");
		}

		return res.status(201).json({
			data: form,
		});
	} catch (error) {
		res.json({ error, message: error?.message });
	}
});
