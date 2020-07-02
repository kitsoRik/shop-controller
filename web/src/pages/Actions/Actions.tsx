import React from "react";
import { Route, Switch } from "react-router";
import Movers from "./Movers";
import { User } from "../../mobx/user";
import { inject, observer } from "mobx-react";
import { UserRole } from "../../models/UserRole";
import Managers from "./Movers copy";

interface Props {
	user?: User;
}

const Actions = ({ user }: Props) => {
	return (
		<Switch>
			{" "}
			{user?.role === UserRole.MOVER && moverRoutes}
			{user?.role === UserRole.MANAGER && managersRoutes}{" "}
		</Switch>
	);
};

const moverRoutes = [<Route path="/actions/movers" component={Movers} />];

const managersRoutes = [
	<Route path="/actions/managers" component={Managers} />,
];

export default inject("user")(observer(Actions));
