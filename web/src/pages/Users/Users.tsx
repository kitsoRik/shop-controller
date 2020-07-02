import React from "react";
import { Switch, Route } from "react-router";
import CreateUser from "./CreateUser";
import Administrators from "./Administrators";

const Users = () => {
	return (
		<Switch>
			<Route path="/users/create" render={() => <CreateUser />} />
			<Route
				path="/users/administrators"
				render={() => <Administrators />}
			/>
		</Switch>
	);
};

export default Users;
