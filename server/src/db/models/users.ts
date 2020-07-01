import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import * as sha256 from "sha256";

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

const User = model("users", schema);

export default {
	createUser: async (email: string, password: string) =>
		User.create({ email, password: await hashPassword(password) }),

	getUserById: (id: string) => User.findOne({ id }),

	getUserByEmail: (email: string) => User.findOne({ email }),

	getUserByEmailAndPassword: async (email: string, password: string) =>
		User.findOne({ email, password: await hashPassword(password) }),
};

const hashPassword = async (password: string) => {
	return sha256(password);
};

(async function () {
	const adminEmail = "admin@admin.com";
	const adminPassword = "admin";
	const admin = await User.findOne({ email: adminEmail });

	if (admin) return;

	await User.create({
		name: "Administrator",
		surname: "Admin",
		email: adminEmail,
		password: await hashPassword(adminPassword),
		isAdmin: true,
	});
	console.log("Admin has been created");
})();
