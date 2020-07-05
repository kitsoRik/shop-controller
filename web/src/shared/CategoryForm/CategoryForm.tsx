import React, { useState } from "react";

import classes from "./CategoryForm.module.scss";
import { Form, Input, Button, Spin } from "antd";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";

type Values = {
	name: string;
	description: string;
};

interface Props {
	initialValues: Values;
	apiMethod: (
		name: string,
		description: string
	) => Promise<AxiosResponse<{ result: object; error?: object }>>;
}

const CategoryForm = ({ initialValues, apiMethod }: Props) => {
	const [loading, setLoading] = useState(false);
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		dirty,
		isValid,
	} = useFormik({
		initialValues,
		validate: ({ name }) => {
			const errors: any = {};

			if (name === "") errors.invoiceNumber = "Ім'я має бути вказане";

			return errors;
		},
		onSubmit: async ({ name, description }) => {
			setLoading(true);
			try {
				const {
					data: { result },
				} = await apiMethod(name, description);
			} catch (e) {
				console.log(e);
				JSON.stringify(e);
			}
			setLoading(false);
		},
	});

	return (
		<Spin spinning={loading}>
			<Form className={classes.form} layout="vertical">
				<Form.Item
					label="Ім'я"
					required={true}
					help={touched.name && errors.name}
					validateStatus={
						touched.name && errors.name ? "error" : "validating"
					}
				>
					<Input
						name="name"
						placeholder="Наприклад: Смартфони"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item
					label="Опис"
					help={touched.description && errors.description}
					validateStatus={
						touched.description && errors.description
							? "error"
							: "validating"
					}
				>
					<Input
						name="description"
						placeholder="Наприклад: Топові смартфони"
						value={values.description}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						className={classes.submitButton}
						style={{ display: "block", margin: "0 auto" }}
						type="primary"
						disabled={!dirty || !isValid}
						onClick={() => handleSubmit()}
					>
						Створити
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	);
};

export default CategoryForm;
