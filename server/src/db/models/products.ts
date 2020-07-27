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
	description: {
		type: String,
		default: "",
	},
	price: {
		type: Number,
		required: true,
		default: 0,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.id) this.id = uuidv4();

	next();
});

const productModel = model("products", schema);

const Product = {
	createProduct: (name: string, category: string, price: number) =>
		productModel.create({ name, category, price, count: 0 }),
	getProducts: () => productModel.find({}),
	getProductById: (id: string) => productModel.findOne({ id }),
	changeProduct: (
		id: string,
		name: string,
		category: string,
		price: number
	) =>
		productModel.findOneAndUpdate(
			{ id },
			{ name, category, price },
			{ new: true }
		),
};
productModel;

export default Product;
