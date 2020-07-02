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

const sessionModel = model("sessions", schema);

const Session = {
	createSession: (userId: string) => sessionModel.create({ userId }),
	getSessionBySesid: (sesid: string) => sessionModel.findOne({ sesid }),
};

export default Session;
