import React from "react";
import { Route, Switch } from "react-router";
import Movers from "./Movers";
import { User } from "../../mobx/user";
import { inject, observer } from "mobx-react";
import { UserRole } from "../../models/UserRole";
import Managers from "./Movers copy";
import Administrators from "./Administrators";

interface Props {
	user?: User;
}

const Actions = ({ user }: Props) => {
	return (
		<Switch>
			{user?.role === UserRole.MOVER && (
				<Route
					path={`/actions/${UserRole.MOVER}s`}
					component={Movers}
				/>
			)}
			{user?.role === UserRole.MANAGER && (
				<Route
					path={`/actions/${UserRole.MANAGER}s`}
					component={Managers}
				/>
			)}
			{user?.role === UserRole.ADMINISTRATOR && (
				<Route
					path={`/actions/${UserRole.ADMINISTRATOR}s`}
					component={Administrators}
				/>
			)}
		</Switch>
	);
};
export default inject("user")(observer(Actions));
