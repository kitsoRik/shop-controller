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
	description: {
		type: String,
		required: true,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.id) this.id = uuidv4();

	next();
});

const categoryModel = model("categories", schema);

const Category = {
	createCategory: (name: string, description: string) =>
		categoryModel.create({ name, description }),
	getCategories: () => categoryModel.find({}),
};

export default Category;
