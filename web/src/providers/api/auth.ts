import { post } from "./api";

export const loginIn = (email: string, password: string) => {
	return post("auth", {
		email,
		password,
	});
};
