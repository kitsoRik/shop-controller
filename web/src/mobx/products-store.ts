import { action, observable } from "mobx";
import { ICategory } from "../models/ICatogory";
import api from "../providers/api";
import { categories } from "../providers/api/categories";

export interface IProduct {
	id: string;
	name: string;
	category: string; //id
	price: number;
}

export class ProductsStore {
	@observable products: IProduct[] = [];
	@observable categories: ICategory[] = [];

	constructor() {
		this.loadCategories();
	}

	getProductById = (id: string) => {
		const product = this.products.find((p) => p.id === id);

		if (!product) {
			this.loadProduct(id);
			return null;
		}

		return product;
	};

	@action loadCategories = async () => {
		const {
			data: { result },
		} = await api.categories.categories(0, 1000);
		const categories: ICategory[] = result.categories;

		this.categories = categories;
	};

	@action createProduct = async (
		name: string,
		category: string,
		price: string
	) => {
		const {
			data: { result },
		} = await api.products.createProduct(name, category, +price);

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

	@action loadProduct = async (id: string) => {
		const {
			data: { result },
		} = await api.products.getProduct(id);

		const product: IProduct = result.product;

		this.products = [...this.products.filter((p) => p.id !== id), product];
	};

	@action changeProduct = async (
		id: string,
		name: string,
		category: string,
		price: number
	) => {
		const {
			data: { result },
		} = await api.products.changeProduct(id, name, category, price);

		const newProduct: IProduct = result.product;

		const productIndex = this.products.findIndex((p) => p.id === id);
		if (productIndex !== -1) {
			this.products[productIndex] = newProduct;
			console.log(this.products[productIndex].name);
		}
	};
}
