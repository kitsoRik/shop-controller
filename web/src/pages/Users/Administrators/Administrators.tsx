import React from "react";

import UsersPage from "../../../shared/UsersPage";
import { UserRole } from "../../../models/UserRole";

const Administrators = () => {
	return <UsersPage role={UserRole.ADMINISTRATOR} />;
};

export default Administrators;
