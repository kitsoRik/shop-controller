import React, { useState } from "react";

import classes from "./CreateProductForm.module.scss";
import { Form, Input, Button, Spin } from "antd";
import { useFormik } from "formik";
import api from "../../../../../providers/api";

interface Props {}

const CreateProductForm = ({}: Props) => {
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
		initialValues: {
			invoiceNumber: "",
		},
		validate: ({ invoiceNumber }) => {
			const errors: any = {};

			if (invoiceNumber === "")
				errors.invoiceNumber = "Номер накладної повинен бути вказаний";

			return errors;
		},
		onSubmit: async ({ invoiceNumber }) => {
			setLoading(true);
			try {
				const {
					data: { result },
				} = await api.actions.movers.unload(+invoiceNumber);
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
					label="Номер накладної"
					help={touched.invoiceNumber && errors.invoiceNumber}
					validateStatus={
						touched && errors.invoiceNumber ? "error" : "validating"
					}
				>
					<Input
						name="invoiceNumber"
						value={values.invoiceNumber}
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
						Подати
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	);
};

export default CreateProductForm;
