import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	count: {
		type: Number,
		default: 0,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.sesid) this.sesid = uuidv4();

	next();
});

const productModel = model("sessions", schema);

const Product = {
	createProduct: (name: string) => productModel.create({ userId }),
	removeSession: (sesid: string) => productModel.findOneAndRemove({ sesid }),
	getSessionBySesid: (sesid: string) => sessionModel.findOne({ sesid }),
};
productModel;

export default Product;
