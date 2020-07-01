import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";
import { observer, inject } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Header from "./components/Header";
import api from "./providers/api";
import { User } from "./mobx/user";
import Drawer from "./components/Drawer";
import Login from "./pages/Login";
import "antd/dist/antd.css";

interface Props {
	user?: User;
}

const App = ({ user }: Props) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const f = async () => {
			try {
				const {
					data: {
						result: {
							user: { name, surname, email, isAdmin },
						},
					},
				} = await api.auth.auth();
				user?.setData(name, surname, email, !!isAdmin);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		};
		f();
	}, []);

	if (loading) return null;

	if (!user!.isLoggined) return <Login />;

	return (
		<BrowserRouter>
			<Header />
			<div className={classes.drawerWrapper}>
				<Drawer />
				<main className={classes.App}>
					<Routes />
				</main>
			</div>
		</BrowserRouter>
	);
};

export default inject("user")(observer(App));
