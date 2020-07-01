import { observable, action, computed } from "mobx";

export class User {
	@observable name: string = "";
	@observable surname: string = "";
	@observable email: string = "";
	@observable isAdmin: boolean = false;

	@action setData(
		name: string,
		surname: string,
		email: string,
		isAdmin: boolean
	) {
		this.name = name;
		this.email = email;
		this.surname = surname;
		this.isAdmin = isAdmin;
	}

	@computed get isLoggined() {
		return this.email !== "";
	}

	@computed get fullName() {
		return `${this.surname} ${this.name}`;
	}
}
