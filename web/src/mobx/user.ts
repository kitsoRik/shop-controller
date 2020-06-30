import { observable, action } from "mobx";

export class User {
	@observable name: string = "";
	@observable email: string = "";
	@observable isAdmin: boolean = false;

	@action setName(name: string) {
		this.name = name;
	}

	@action setEmail(email: string) {
		this.email = email;
	}
}
