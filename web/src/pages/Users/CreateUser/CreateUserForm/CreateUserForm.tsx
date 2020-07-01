import React from "react";
import { Button, Input, Checkbox, Form } from "antd";
import classes from "./CreateUserForm.module.scss";
import { Formik } from "formik";

interface Props {
	formik: any;
}

const CreateUserForm = ({
	formik: { values, errors, touched, handleChange, handleBlur, handleSubmit },
}: Props) => {
	return (
		<Form onSubmitCapture={handleSubmit} className={classes.form}>
			<Items
				{...{
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					names: [
						"name",
						"surname",
						"email",
						"password",
						"passwordConfirm",
					],
					labels: [
						"Ім'я",
						" Прізвище",
						"E-mail",
						"Пароль",
						"Підтвердження паролю",
					],
				}}
			/>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{ display: "block" }}
					disabled={
						Object.keys(errors).length !== 0 ||
						Object.keys(touched).length === 0
					}
					className={classes.submitButton}
				>
					Створити
				</Button>
			</Form.Item>
		</Form>
	);
};

const Items = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	names,
	labels,
}: any) => {
	return (
		<>
			{names.map((name: string, index: number) => {
				const label = labels[index];
				const InputComponent = name.startsWith("password")
					? Input.Password
					: Input;
				return (
					<Form.Item
						className={classes.formItem}
						label={label}
						name={name}
						validateStatus={
							errors[name] && touched[name]
								? "error"
								: "validating"
						}
						help={touched[name] && errors[name]}
					>
						<InputComponent
							name={name}
							value={values[name]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Item>
				);
			})}
		</>
	);
};

export default CreateUserForm;
