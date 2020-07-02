import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { UserRole } from "../../../../../models/UserRole";

interface Props {
	name: string;
	surname: string;
	email: string;
	role: UserRole;

	handleSubmit: AdministratorsEditFormSubmit;
}

const AdministratorsEditForm = ({
	name,
	surname,
	email,
	role,
	handleSubmit,
}: Props) => {
	const {
		values,
		handleSubmit: handleSubmitCapture,
		handleChange,
		handleBlur,
		isValid,
	} = useFormik({
		initialValues: {
			name,
			surname,
			email,
			role,
		},
		onSubmit: handleSubmit,
	});

	return (
		<Form onSubmitCapture={handleSubmitCapture}>
			<Form.Item label="Ім'я">
				<Input
					value={values.name}
					name="name"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Item>
			<Form.Item label="Прізвище">
				<Input value={values.surname} />
			</Form.Item>
			<Form.Item label="E-mail">
				<Input value={values.email} />
			</Form.Item>
			<Button
				type="primary"
				disabled={!isValid}
				onClick={() => handleSubmitCapture()}
			>
				Змінити
			</Button>
		</Form>
	);
};

export type AdministratorsEditFormSubmit = (values: {
	name: string;
	surname: string;
	email: string;
	role: UserRole;
}) => void;

export default AdministratorsEditForm;
