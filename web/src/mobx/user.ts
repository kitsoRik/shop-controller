import { observable, action, computed } from "mobx";

export class User {
	@observable name: string = "";
	@observable email: string = "";
	@observable isAdmin: boolean = false;

	@action setData(name: string, email: string, isAdmin: boolean) {
		this.name = name;
		this.email = email;
		this.isAdmin = isAdmin;
	}

	@computed get isLoggined() {
		return this.email !== "";
	}
}
