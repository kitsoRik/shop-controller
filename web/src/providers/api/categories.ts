import { get } from "./api";

export const categories = (offset: number, limit: number) => {
	return get(`/categories`, { offset, limit });
};
