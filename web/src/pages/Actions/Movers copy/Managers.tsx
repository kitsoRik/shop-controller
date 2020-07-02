import React from "react";
import { Switch, Route } from "react-router";
import { UserRole } from "../../../models/UserRole";
import CreateProduct from "./Unload";

const Managers = () => {
	return (
		<Switch>
			<Route
				path={`/actions/${UserRole.MANAGER}s/create-product`}
				component={CreateProduct}
			/>
		</Switch>
	);
};

export default Managers;
