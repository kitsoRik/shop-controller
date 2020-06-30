import React from "react";
import classes from "./App.module.scss";
import { observer } from "mobx-react";
import Login from "./pages/Login";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";

function App({ user }: any) {
	return (
		<div className={classes.App}>
			<Login user={user} />
		</div>
	);
}

export default observer(App);
