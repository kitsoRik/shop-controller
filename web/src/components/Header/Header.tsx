import React from "react";

import classes from "./Header.module.scss";
import { observer, inject } from "mobx-react";
import { User } from "../../mobx/user";
import { Button } from "antd";
import api from "../../providers/api";

interface Props {
	user?: User;
}

const Header = ({ user }: Props) => {
	const unlogin = async () => {
		try {
			const {} = await api.auth.unlogin();
			user!.clear();
		} catch (e) {
			user!.clear();
			console.log(e);
			JSON.stringify(e);
		}
	};

	return (
		<header className={classes.header}>
			<span>LOGo</span>
			<Button onClick={unlogin}>Вийти</Button>
		</header>
	);
};

export default inject("user")(observer(Header));
