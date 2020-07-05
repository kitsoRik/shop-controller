import React from "react";
import { Route, Switch } from "react-router";
import CreateCategory from "./Unload/CreateCategory";

const Administrators = () => {
	return (
		<Switch>
			<Route
				path="/actions/administrators/create-category"
				component={CreateCategory}
			/>
		</Switch>
	);
};

export default Administrators;
