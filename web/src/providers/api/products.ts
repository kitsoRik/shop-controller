import api from ".";

export const getProducts = (offset: number, limit: number) =>
	api.api.get("products", { offset, limit });

export const createProduct = (name: string, category: string, price: number) =>
	api.api.post("/products/", { category, name, price });

export const changeProduct = (
	id: string,
	name: string,
	category: string,
	price: number
) => api.api.put(`/products/${id}`, { category, name, price });
