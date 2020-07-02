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

export const users = (role: UserRole, offset: number, limit: number) => {
	return get(`/users/${role}s`, { offset, limit });
};

export const putAdministrator = (
	id: string,
	name: string,
	surname: string,
	email: string,
	role: UserRole,
	description: string
) => {
	return put(`/users/${id}/`, { name, surname, email, role, description });
};
