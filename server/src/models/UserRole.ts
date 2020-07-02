export enum UserRole {
	NOONE = "noone",
	ADMINISTRATOR = "administrator",
	SELLER = "seller",
	MOVER = "mover",
	MANAGER = "manager",
}

export const UserRoleKeys = Object.keys(UserRole);
// @ts-ignore
export const UserRoleValues = UserRoleKeys.map((k) => UserRole[k]);
