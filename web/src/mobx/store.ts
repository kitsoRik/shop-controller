import { Users } from "./users";
import { Categories } from "./categories";

export class Store {
	users = new Users();
	categories = new Categories();
}
