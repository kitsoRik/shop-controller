import React from "react";

import { Switch, Route } from "react-router";
import Login from "../pages/Login";
import { User } from "../mobx/user";
import Home from "../pages/Home";
import { observer, inject } from "mobx-react";
import Users from "../pages/Users";
import Actions from "../pages/Actions";
import Products from "../pages/Products";

interface Props {
	user?: User;
}

const Routes = ({ user }: Props) => {
	return (
		<Switch>
			<Route path="/" exact render={() => <Home />} />
			{user!.isAdmin && adminsRoutes}
			<Route path="/actions" render={() => <Actions />} />
			<Route path="/products" render={() => <Products />} />
		</Switch>
	);
};

const adminsRoutes = [<Route path="/users" render={() => <Users />} />];

export default inject("user")(observer(Routes));
