import { put } from "../../api";

export const createCategory = (name: string, description: string) => {
	return put(`/categories/`, {
		name,
		description,
	});
};
