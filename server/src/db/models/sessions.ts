import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new Schema({
	sesid: {
		type: String,
	},
	userId: {
		type: String,
		required: true,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.sesid) this.sesid = uuidv4();

	next();
});

const Session = model("sessions", schema);

export default {
	createSession: (userId: string) => Session.create({ userId }),
	getSessionBySesid: (sesid: string) => Session.findOne({ sesid }),
};
