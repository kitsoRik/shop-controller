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
	category: {
		type: String, // category id
		required: true,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.sesid) this.sesid = uuidv4();

	next();
});

const productModel = model("sessions", schema);

const Product = {
	createProduct: (name: string) => productModel.create({ name, count: 0 }),
};
productModel;

export default Product;
