import * as express from "express";
import { sendSuccess } from "../../errors/base";
import { IExtendRequest } from "../../extends/IExtendRequest";
import Product from "../../db/models/products";

const router = express.Router();

router.get("/", async (req: IExtendRequest, res) => {
	const { offset, limit } = req.query;
	const products = await Product.getProducts()
		.skip(+offset!)
		.limit(+limit!);

	sendSuccess(res)({
		products,
	});
});

router.post("/", async (req: IExtendRequest, res) => {
	const { name, category } = req.body;

	const product = await Product.createProduct(name, category);

	sendSuccess(res)({
		product,
	});
});

export default router;
