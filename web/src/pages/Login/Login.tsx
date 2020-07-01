import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Page from "../../shared/Page";
import classes from "./Login.module.scss";
import { User } from "../../mobx/user";
import { observer, inject } from "mobx-react";
import api from "../../providers/api";

interface Props {
	user?: User;
}

const Login = ({ user }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit: (values: {
		email: string;
		password: string;
	}) => void | Promise<any> = async ({
		email: inputEmail,
		password: inputPassword,
	}) => {
		const {
			data: {
				result: {
					user: { name, surname, email, isAdmin },
				},
			},
		} = await api.auth.loginIn(inputEmail, inputPassword);
		user!.setData(name, surname, email, !!isAdmin);
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

export default observer(inject("user")(Login));
