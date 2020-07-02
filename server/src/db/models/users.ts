import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import * as sha256 from "sha256";
import { UserRoleValues } from "../../models/UserRole";

const schema = new Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: "noone",
		enum: UserRoleValues,
	},
	description: {
		type: String,
		default: "",
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.id) this.id = uuidv4();

	next();
});

const userModel = model("users", schema);

const User = {
	createUser: async (
		name: string,
		surname: string,
		email: string,
		password: string,
		role: string
	) =>
		userModel.create({
			name,
			surname,
			email,
			password: await hashPassword(password),
			role,
		}),

	changeUser: (
		id: string,
		changes: {
			name?: string;
			surname?: string;
			email?: string;
			role?: string;
			description?: string;
		}
	) => userModel.findOneAndUpdate({ id }, changes, { new: true }),

	getUserById: (id: string) => userModel.findOne({ id }),

	getUserByEmail: (email: string) => userModel.findOne({ email }),

	getUserByEmailAndPassword: async (email: string, password: string) =>
		userModel.findOne({ email, password: await hashPassword(password) }),

	getUsers: async (offset: number, limit: number) =>
		userModel.find({}).skip(offset).limit(limit),

	getUsersByRole: async (role: string, offset: number, limit: number) =>
		userModel.find({ role }).skip(offset).limit(limit),
};

export default User;

const hashPassword = async (password: string) => {
	return sha256(password);
};

(async function () {
	const adminEmail = "admin@admin.com";
	const adminPassword = "admin";
	const admin = await userModel.findOne({ email: adminEmail });

	if (admin) return;

	await userModel.create({
		name: "Administrator",
		surname: "Admin",
		email: adminEmail,
		password: await hashPassword(adminPassword),
		isAdmin: true,
	});
	console.log("Admin has been created");
})();
