import api from ".";

export const getProducts = (offset: number, limit: number) =>
	api.api.get("products", { offset, limit });

export const createProduct = (name: string, category: string) =>
	api.api.post("/products/", { category, name });
