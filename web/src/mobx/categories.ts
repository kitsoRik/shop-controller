import { ICategory } from "../models/ICatogory";
import { observable, action, computed } from "mobx";
import api from "../providers/api";

export class Categories {
	@observable categories: { [id: string]: ICategory } = {};

	@observable categoriesIdsByPage: { [page: number]: string[] } = {}; // ids

	@action async loadCategories(page: number, limit: number) {
		console.log(page, limit);
		const {
			data: {
				result: { categories, categoriesNumbers },
			},
		} = await api.categories.categories((page - 1) * limit, limit);

		this.appendCategories(categories);

		this.categoriesIdsByPage[page] = categories.map((c: any) => c.id);
		console.log();
	}

	@action appendCategory(category: ICategory) {
		this.appendCategories([category]);
	}
	@action appendCategories(categories: ICategory[]) {
		categories.forEach((c) => (this.categories[c.id] = c));
	}

	categoriesByPage(page: number): ICategory[] {
		return (
			this.categoriesIdsByPage[page]?.map((id) => this.categories[id]) ??
			[]
		);
	}
}
