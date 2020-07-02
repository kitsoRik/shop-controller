import React from "react";

import UsersPage from "../../../shared/UsersPage";
import { UserRole } from "../../../models/UserRole";

const Sellers = () => {
	return <UsersPage role={UserRole.SELLER} />;
};

export default Sellers;
