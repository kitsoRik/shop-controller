import { post } from "./api";

export const auth = () => {
	return post("/auth");
};

export const loginIn = (email: string, password: string) => {
	return post("/auth/login", {
		email,
		password,
	});
};

export const unlogin = () => {
	return post("/auth/unlogin");
};
