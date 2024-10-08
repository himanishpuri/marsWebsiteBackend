import asyncHandler from "express-async-handler";

export const checkFormDetails = asyncHandler(async function (req, res, next) {
	const { fullName, rollNo, email, phoneNo, department, branch, year } =
		req.body;

	try {
		if (
			[fullName, rollNo, email, phoneNo, department, branch, year].some(
				(val) => !val,
			)
		) {
			res.status(400);
			throw new Error("Please fill all the fields");
		}

		if (!fullName || fullName?.trim().length === 0) {
			res.status(400);
			throw new Error("Full Name cannot be empty.");
		}

		if (isNaN(rollNo) || String(rollNo).trim().length !== 9) {
			res.status(400);
			throw new Error(
				"Roll number should be of 9 digits and should be a number",
			);
		}

		if (String(phoneNo).trim().length !== 10 || isNaN(phoneNo)) {
			res.status(400);
			throw new Error(
				"Phone number should be of 10 digits and should be a number",
			);
		}

		if (!email.includes("@thapar.edu")) {
			res.status(400);
			throw new Error("Enter a valid Thapar Email ID.");
		}

		const validBranches = [
			"COPC",
			"COSE",
			"CSE",
			"COE",
			"COBS",
			"CSBS",
			"ENC",
			"EEC",
			"ECE",
			"EEE",
			"EIC",
			"ELE",
			"MEE",
			"RAI",
			"MEC",
			"EVD",
			"CIE",
			"BME",
			"BT",
			"CCA",
			"CHE", //? add more branches if needed
		];
		if (!validBranches.includes(branch.toUpperCase())) {
			res.status(400);
			throw new Error("Invalid Branch.");
		}

		if (year <= 2023) {
			res.status(400);
			throw new Error("Invalid Year.");
		}

		//TODO: add Validation for department.
		req.studentInfo = {
			fullName: fullName.toLowerCase(),
			rollNo,
			email,
			phoneNo,
			department: department.toLowerCase(),
			branch: branch.toUpperCase(),
			year,
		};
		next();
	} catch (error) {
		res.json({ success: false, error, message: error.message });
	}
});
