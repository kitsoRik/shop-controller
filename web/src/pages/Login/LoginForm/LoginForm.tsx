import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import classes from "./LoginForm.module.scss";
import { useFormik, FormikHelpers } from "formik";

interface ILoginForm {
	email: string;
	setEmail: (value: string) => void;

	password: string;
	setPassword: (value: string) => void;

	handleSubmit: (
		values: {
			email: string;
			password: string;
		},
		formikHelpers: FormikHelpers<{
			email: string;
			password: string;
		}>
	) => void | Promise<any>;
}

const LoginForm = ({
	email,
	setEmail,
	password,
	setPassword,
	handleSubmit,
}: ILoginForm) => {
	const formik = useFormik({
		initialValues: {
			email,
			password,
		},
		onSubmit: handleSubmit,
		validate: ({ email, password }) => {
			const errors: any = {};

			if (email === "") errors.email = "E-mail не може бути пустий";
			if (password === "") errors.password = "Пароль не може бути пустий";

			return errors;
		},
	});
	return (
		<form className={classes.loginForm} onSubmit={formik.handleSubmit}>
			<div>
				<h3 style={{ margin: "1px 0" }}>E-mail</h3>
				<InputText
					name="email"
					onBlur={formik.handleBlur}
					onChangeCapture={formik.handleChange}
					value={email}
					onChange={(e: any) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<h3 style={{ margin: "1px 0" }}>Пароль</h3>
				<InputText
					type="password"
					name="password"
					onBlur={formik.handleBlur}
					onChangeCapture={formik.handleChange}
					value={password}
					onChange={(e: any) => setPassword(e.target.value)}
				/>
			</div>
			<Button
				label="Ввійти"
				disabled={
					!formik.isValid || Object.keys(formik.touched).length === 0
				}
			/>
		</form>
	);
};

export default LoginForm;
