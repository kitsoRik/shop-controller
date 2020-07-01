import * as mongoose from "mongoose";

export const connect = async () => {
	await mongoose.connect("mongodb://localhost:27017/shop-controller", {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	});
};
