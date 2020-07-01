import React from "react";
import classes from "./App.module.scss";
import { observer } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import Routes from "./Routes";
import Header from "./components/Header";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className={classes.App}>
				<Routes />
			</main>
		</BrowserRouter>
	);
};

export default observer(App);
