import React, { useState } from "react";

import classes from "./CreateProductForm.module.scss";
import { Form, Input, Button, Spin, Select } from "antd";
import { useFormik } from "formik";
import api from "../../../../../providers/api";

interface Props {}

const CreateProductForm = ({}: Props) => {
	const [loading, setLoading] = useState(false);
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		handleChange,
		handleBlur,
		handleSubmit,
		dirty,
		isValid,
	} = useFormik({
		initialValues: {
			category: "",
			name: "",
		},
		validate: ({ category }) => {
			const errors: any = {};

			if (category === "")
				errors.category = "Категорія продукту повинена бути вказана";

			return errors;
		},
		onSubmit: async ({ category, name }) => {
			setLoading(true);
			try {
				const {
					data: { result },
				} = await api.products.createProduct(category, name);
				console.log(result);
			} catch (e) {
				console.log(e);
				JSON.stringify(e);
			}
			setLoading(false);
		},
	});

	return (
		<Spin spinning={loading}>
			<Form className={classes.form}>
				<Form.Item
					label="Категорія"
					help={touched.category && errors.category}
					validateStatus={
						touched.category && errors.category
							? "error"
							: "validating"
					}
				>
					<Select
						value={values.category}
						onChange={(value) => setFieldValue("category", value)}
						onBlur={() => setFieldTouched("category", true)}
					>
						<Select.Option value="1">1</Select.Option>
						<Select.Option value="2">1</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="Назва"
					help={touched.name && errors.name}
					validateStatus={
						touched.name && errors.name ? "error" : "validating"
					}
				>
					<Input
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						className={classes.submitButton}
						style={{ display: "block" }}
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

export default CreateProductForm;
