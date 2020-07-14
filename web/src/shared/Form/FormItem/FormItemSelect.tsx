import { Form, Select } from "antd";
import React from "react";
import { FormItemPropsBase } from "./FormItemPropsBase";

export interface Props extends FormItemPropsBase {
	type: "select";
	options: { value: string; text: string }[];
}

const FormItemSelect = ({
	name = "",
	label,
	error,
	touched,
	options,
	value,
	setFieldTouched,
	setFieldValue,
}: Props) => {
	return (
		<Form.Item
			label={label}
			validateStatus={error && touched ? "error" : "validating"}
			help={touched && error}
		>
			<Select
				value={value}
				onChange={(value) => setFieldValue!(name, value)}
				onBlur={() => setFieldTouched!(name, true)}
			>
				{options.map(({ value, text }) => (
					<Select.Option value={value}>{text}</Select.Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default FormItemSelect;
