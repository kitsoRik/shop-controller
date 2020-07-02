import { UserRole } from "./UserRole";

export interface IUser {
	id: string;
	role: UserRole;
	isAdmin: boolean;
}
