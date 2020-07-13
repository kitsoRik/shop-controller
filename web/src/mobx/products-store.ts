import { action, observable } from "mobx";
import { ICategory } from "../models/ICatogory";
import api from "../providers/api";
import { categories } from "../providers/api/categories";

export interface IProduct {
	id: string;
	name: string;
	category: string; //id
}

export class ProductsStore {
	@observable products: IProduct[] = [];
	@observable categories: ICategory[] = [];

	constructor() {
		this.loadCategories();
	}

	@action loadCategories = async () => {
		const {
			data: { result },
		} = await api.categories.categories(0, 1000);
		const categories: ICategory[] = result.categories;

		this.categories = categories;
	};

	@action createProduct = async (name: string, category: string) => {
		const {
			data: { result },
		} = await api.products.createProduct(name, category);

		const product: IProduct = result.product;

		this.products.push(product);
	};

	@action loadProducts = async (page: number) => {
		const {
			data: { result },
		} = await api.products.getProducts((page - 1) * 50, 50);

		const products: IProduct[] = result.products;

		this.products = products;
	};
}
