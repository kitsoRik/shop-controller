import { ProductsStore } from "./products-store";
import { Store } from "./store";
import { User } from "./user";

export const store = new Store();
export const user = new User();

export const productsStore = new ProductsStore();
