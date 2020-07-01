import React from "react";
import { Switch, Route } from "react-router";
import CreateUser from "./CreateUser";

const Users = () => {
	return (
		<Switch>
			<Route path="/users/create-user" render={() => <CreateUser />} />
		</Switch>
	);
};

export default Users;
