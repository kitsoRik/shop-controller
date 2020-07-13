import { Button, Form, Input } from "antd";
import React from "react";
import { FormItemPropsBase } from "./FormItemPropsBase";

export interface Props extends FormItemPropsBase {
	type: "button";
	isSubmit?: boolean;
	disabled?: boolean;
	handleSubmit?: (e: any) => any;
}

const FormItemButton = ({
	label,
	error,
	touched,
	disabled,
	isSubmit,
	handleSubmit,
}: Props) => {
	return (
		<Form.Item
			label={label}
			validateStatus={error && touched ? "error" : "validating"}
			help={touched && error}
		>
			<Button
				style={{ display: "block" }}
				type="primary"
				disabled={disabled}
				onClick={handleSubmit}
			>
				Створити
			</Button>
		</Form.Item>
	);
};

export default FormItemButton;
