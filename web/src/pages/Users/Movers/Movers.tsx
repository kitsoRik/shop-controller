import React from "react";

import UsersPage from "../../../shared/UsersPage";
import { UserRole } from "../../../models/UserRole";

const Movers = () => {
	return <UsersPage role={UserRole.MOVER} />;
};

export default Movers;
