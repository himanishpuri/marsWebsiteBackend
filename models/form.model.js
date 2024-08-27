import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			minlength: 1,
		},
		rollNo: {
			type: Number,
			unique: true,
			required: true,
			minlength: 9,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /.+@thapar.edu/,
		},
		phoneNo: {
			type: Number,
			required: true,
			minlength: 10,
			unique: true,
		},
		department: {
			type: String,
			required: true,
		},
		branch: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Form", formSchema);
