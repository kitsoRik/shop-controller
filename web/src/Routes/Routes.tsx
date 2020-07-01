import React from "react";

import { Switch, Route } from "react-router";
import Login from "../pages/Login";
import { User } from "../mobx/user";
import Home from "../pages/Home";
import { observer, inject } from "mobx-react";
import Users from "../pages/Users";

interface Props {
	user?: User;
}

const Routes = ({ user }: Props) => {
	return (
		<Switch>
			<Route path="/" exact render={() => <Home />} />
			<Route path="/users" render={() => <Users />} />
		</Switch>
	);
};

export default inject("user")(observer(Routes));
