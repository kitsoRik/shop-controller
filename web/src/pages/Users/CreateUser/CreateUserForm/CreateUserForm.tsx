import React from "react";
import { Button, Input, Checkbox, Form, Select } from "antd";
import classes from "./CreateUserForm.module.scss";
import { Formik } from "formik";
import { Option } from "antd/lib/mentions";
import { UserRole } from "../../../../models/UserRole";

interface Props {
	formik: any;
}

const CreateUserForm = ({
	formik: {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
		setFieldTouched,
	},
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
					params: [
						{
							name: "name",
							label: "Ім'я",
							placeholder: "Наприклад: Ростислав",
						},
						{
							name: "surname",
							label: "Прізвище",
							placeholder: "Наприклад: Підбурачинський",
						},
						{
							name: "email",
							label: "E-mail",
							placeholder: "Наприклад: example@mail.com",
						},
						{
							name: "password",
							label: "Пароль",
							placeholder: "Наприклад: 36eoDMBWbZEnlKCx6n",
						},
						{
							name: "passwordConfirm",
							label: "Підтвердження паролю",
							placeholder: "Наприклад: 36eoDMBWbZEnlKCx6n",
						},
					],
				}}
			/>
			<Form.Item
				className={classes.formItem}
				label={"Роль"}
				name={"role"}
				validateStatus={
					errors.role && touched.role ? "error" : "validating"
				}
				help={touched.role && errors.role}
			>
				<Select
					value={values.role}
					onChange={(value) => setFieldValue("role", value)}
					onBlur={() => setFieldTouched("role")}
					placeholder="Наприклад: Адміністратор"
				>
					<Option value={UserRole.ADMINISTRATOR}>
						Адміністратори
					</Option>
					<Option value={UserRole.SELLER}>Продавець</Option>
					<Option value={UserRole.MOVER}>Грузчик</Option>
					<Option value={UserRole.MANAGER}>Менеджер</Option>
				</Select>
			</Form.Item>
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
	params,
}: any) => {
	return (
		<>
			{params.map((param: any, index: number) => {
				const { name, label, placeholder } = param;
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
							placeholder={placeholder}
						/>
					</Form.Item>
				);
			})}
		</>
	);
};

export default CreateUserForm;
