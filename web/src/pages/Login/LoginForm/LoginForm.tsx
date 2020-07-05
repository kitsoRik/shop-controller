import React, { useState } from "react";

import classes from "./LoginForm.module.scss";
import { useFormik, FormikHelpers } from "formik";
import { Form, Input, Button, Alert, Spin } from "antd";
import { User } from "../../../mobx/user";
import api from "../../../providers/api";
import { inject, observer } from "mobx-react";

interface Props {
	user?: User;
}

const LoginForm = ({ user }: Props) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const {
		values,
		setErrors,
		handleChange,
		handleBlur,
		handleSubmit,
		isValid,
		dirty,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ email: inputEmail, password: inputPassword }) => {
			setLoading(true);
			try {
				setError(null);
				const {
					data: {
						result: {
							user: { name, surname, email, role, isAdmin },
						},
					},
				} = await api.auth.loginIn(inputEmail, inputPassword);
				user!.setData(name, surname, email, role, !!isAdmin);
			} catch (e) {
				if (e.response) {
					const type = e.response.data.error.type;
					switch (type) {
						case "UNKNOWN_DATA":
							setError("Такої пари даних не існує");
					}
				}
			}
			setLoading(false);
		},
		validate: ({ email, password }) => {
			const errors: any = {};

			if (email === "") errors.email = "E-mail не може бути пустий";
			if (password === "") errors.password = "Пароль не може бути пустий";

			return errors;
		},
	});

	return (
		<Spin spinning={loading}>
			<Form
				className={classes.loginForm}
				onSubmitCapture={handleSubmit}
				layout="vertical"
			>
				<Form.Item>
					{error && <Alert message={error} type="error" showIcon />}
				</Form.Item>
				<Form.Item label="E-mail">
					<Input
						name="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item label="Пароль">
					<Input.Password
						name="password"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ display: "block", margin: "0 auto" }}
						disabled={!isValid || !dirty}
					>
						Ввійти
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	);
};

export default inject("user")(observer(LoginForm));
