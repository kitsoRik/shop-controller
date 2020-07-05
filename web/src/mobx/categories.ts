import { categories } from "../providers/api/categories";
import { ICategory } from "../models/ICatogory";
import { observable, action } from "mobx";

export class Categories {
	@observable categories: ICategory[] = [];

	@action appendCategory(category: ICategory) {
		this.appendCategories([category]);
	}
	@action appendCategories(categories: ICategory[]) {
		const newIds = categories.map((c) => c.id);
		this.categories = [
			...this.categories.filter((c) => !newIds.includes(c.id)),
			...categories,
		];
	}
}
