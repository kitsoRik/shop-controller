import { get, put } from "./api";

export const categories = (offset: number, limit: number) => {
	return get(`/categories`, { offset, limit });
};

export const createCategory = (name: string, description: string) => {
	return put(`/categories/`, {
		name,
		description,
	});
};
