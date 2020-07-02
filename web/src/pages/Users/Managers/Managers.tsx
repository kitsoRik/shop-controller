import React from "react";
import UsersPage from "../../../shared/UsersPage";
import { UserRole } from "../../../models/UserRole";

const Managers = () => {
	return <UsersPage role={UserRole.MANAGER} />;
};

export default Managers;

