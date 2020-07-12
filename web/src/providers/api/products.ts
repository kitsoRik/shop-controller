import api from ".";

export const getProducts = () => api.api.get("products");

export const createProduct = (category: string, name: string) =>
	api.api.post("/products/", { category, name });
