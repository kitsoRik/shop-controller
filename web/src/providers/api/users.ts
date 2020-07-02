import { post, get, put } from "./api";
import { UserRole } from "../../models/UserRole";

export const createUser = (
	name: string,
	surname: string,
	email: string,
	password: string,
	role: string
) => {
	return post("/users/", { name, surname, email, password, role });
};

export const administrators = (offset: number, limit: number) => {
	return get("/users/administrators", { offset, limit });
};

export const putAdministrator = (
	id: string,
	name: string,
	surname: string,
	email: string,
	role: UserRole
) => {
	return put(`/users/administrators/${id}/`, { name, surname, email, role });
};
