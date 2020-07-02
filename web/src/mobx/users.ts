import { observable, action, computed } from "mobx";
import { IUser } from "../models/IUser";

export class Users {
	@observable users: IUser[] = [];

	@action appendUser(user: IUser) {
		return this.appendUsers([user]);
	}

	@action appendUsers(users: IUser[]) {
		const newIds = users.map((u) => u.id);
		this.users = [
			...this.users.filter((u) => !newIds.includes(u.id)),
			...users,
		];
	}

	@computed get administrators() {
		return this.users.filter((u) => u.role === "administrator");
	}
}
