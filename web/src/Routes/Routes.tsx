import React from "react";

import { Switch, Route } from "react-router";
import Login from "../pages/Login";
import { User } from "../mobx/user";
import Home from "../pages/Home";
import { observer, inject } from "mobx-react";

interface Props {
	user?: User;
}

const Routes = ({ user }: Props) => {
	const isLoggined = user!.isLoggined;
	return (
		<Switch>
			{!isLoggined && <Route path="/" render={() => <Login />} />}
			{isLoggined && <Route path="" exact render={() => <Home />} />}
		</Switch>
	);
};

export default inject("user")(observer(Routes));
