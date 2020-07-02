import React from "react";
import { Switch, Route } from "react-router";
import Unload from "./Unload";

const Movers = () => {
	return (
		<Switch>
			<Route path="/actions/movers/unload" component={Unload} />
		</Switch>
	);
};

export default Movers;
