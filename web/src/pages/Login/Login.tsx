import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Page from "../../shared/Page";
import classes from "./Login.module.scss";
import { User } from "../../mobx/user";
import { observer } from "mobx-react";

interface ILogin {
	user: User;
}

const Login = ({ user }: ILogin) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit: (values: {
		email: string;
		password: string;
	}) => void | Promise<any> = ({ email, password }) => {
		user.setEmail(email);
	};
	return (
		<Page className={classes.loginPage}>
			<LoginForm
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				handleSubmit={handleSubmit}
			/>
		</Page>
	);
};

export default observer(Login);
