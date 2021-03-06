import { UserRole } from "./UserRole";

export interface IUser {
	id: string;
	name: string;
	surname: string;
	email: string;
	role: UserRole;
	description: string;
	imageName?: string;
}
