import React from "react";
import { Switch, Route } from "react-router";
import CreateUser from "./CreateUser";
import Administrators from "./Administrators";
import { UserRole, UserRoleValues } from "../../models/UserRole";
import Sellers from "./Sellers/Sellers";
import Movers from "./Movers";
import UsersPage from "../../shared/UsersPage";

const Users = () => {
	return (
		<Switch>
			<Route path="/users/create" render={() => <CreateUser />} />
			{UserRoleValues.map((role) => (
				<Route
					key={role}
					path={`/users/${role}s`}
					render={() => <UsersPage role={role} />}
				/>
			))}
		</Switch>
	);
};

export default Users;
