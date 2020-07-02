import React from "react";
import { Switch, Route } from "react-router";
import CreateUser from "./CreateUser";
import Administrators from "./Administrators";
import { UserRole } from "../../models/UserRole";
import Sellers from "./Sellers/Sellers";
import Movers from "./Movers";

const Users = () => {
	return (
		<Switch>
			<Route path="/users/create" render={() => <CreateUser />} />
			<Route
				path={`/users/${UserRole.ADMINISTRATOR}s`}
				component={Administrators}
			/>
			<Route path={`/users/${UserRole.SELLER}s`} component={Sellers} />
			<Route path={`/users/${UserRole.MOVER}s`} component={Movers} />
		</Switch>
	);
};

export default Users;
