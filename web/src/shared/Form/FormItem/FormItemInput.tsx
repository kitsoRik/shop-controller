import { Form, Input } from "antd";
import React from "react";
import { FormItemPropsBase } from "./FormItemPropsBase";

export interface Props extends FormItemPropsBase {
	type: "input";
}

const FormItemInput = ({
	type,
	label,
	error,
	touched,
	name,
	value,
	handleChange,
	handleBlur,
}: Props) => {
	return (
		<Form.Item
			label={label}
			validateStatus={error && touched ? "error" : "validating"}
			help={touched && error}
		>
			<Input
				value={value}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		</Form.Item>
	);
};

export default FormItemInput;
