import { observable, action, computed } from "mobx";
import { UserRole } from "../models/UserRole";

export class User {
	@observable name: string = "";
	@observable surname: string = "";
	@observable email: string = "";
	@observable role: UserRole = UserRole.NOONE;
	@observable isAdmin: boolean = false;

	@action setData(
		name: string,
		surname: string,
		email: string,
		role: UserRole,
		isAdmin: boolean
	) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.role = role;
		this.isAdmin = isAdmin;
	}

	@computed get isLoggined() {
		return this.email !== "";
	}

	@computed get fullName() {
		return `${this.surname} ${this.name}`;
	}

	@action clear() {
		this.name = "";
		this.surname = "";
		this.email = "";
		this.isAdmin = false;
	}
}
