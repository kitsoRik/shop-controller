import { observable, action, computed } from "mobx";
import { IUser } from "../models/IUser";
import { UserRole } from "../models/UserRole";

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

	getUserById(id: string) {
		return this.users.find((u) => u.id === id);
	}

	getUsersByRole(role: UserRole) {
		return this.users.filter((u) => u.role === role);
	}
}
