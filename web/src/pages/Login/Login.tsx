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
	return (
		<Page className={classes.loginPage}>
			<LoginForm />
		</Page>
	);
};

export default observer(inject("user")(Login));
