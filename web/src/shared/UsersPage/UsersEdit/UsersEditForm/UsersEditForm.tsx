import React from "react";
import { Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { UserRole } from "../../../../models/UserRole";
import TextArea from "antd/lib/input/TextArea";

interface Props {
	values: {
		name: string;
		surname: string;
		email: string;
		role: string;
		description: string;
	};
	errors: {
		name: string;
		surname: string;
		email: string;
		role: string;
		description: string;
	};
	touched: {
		name: boolean;
		surname: boolean;
		email: boolean;
		role: boolean;
		description: boolean;
	};
	handleChange: (e: any) => void;
	handleBlur: (e: any) => void;
	setFieldValue: (field: string, value: string) => void;
	setFieldTouched: (field: string, value: boolean) => void;
}

const AdministratorsEditForm = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
}: Props) => {
	return (
		<Form>
			<Form.Item
				label="Ім'я"
				validateStatus={
					errors.name && touched.name ? "error" : "validating"
				}
				help={touched.name && errors.name}
			>
				<Input
					value={values.name}
					name="name"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Item>
			<Form.Item
				label="Прізвище"
				validateStatus={
					errors.surname && touched.surname ? "error" : "validating"
				}
				help={touched.surname && errors.surname}
			>
				<Input
					value={values.surname}
					name="surname"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Item>
			<Form.Item
				label="E-mail"
				validateStatus={
					errors.email && touched.email ? "error" : "validating"
				}
				help={touched.email && errors.email}
			>
				<Input
					value={values.email}
					name="email"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Item>
			<Form.Item
				label="Роль"
				validateStatus={
					errors.role && touched.role ? "error" : "validating"
				}
				help={touched.role && errors.role}
			>
				<Select
					value={values.role}
					onChange={(value) => setFieldValue("role", value)}
					onBlur={() => setFieldTouched("role", true)}
				>
					<Option value={UserRole.ADMINISTRATOR}>
						Адміністратор
					</Option>
					<Option value={UserRole.SELLER}>Продавець</Option>
					<Option value={UserRole.MOVER}>Грузчик</Option>
				</Select>
			</Form.Item>
			<Form.Item
				label="Опис діяльності"
				validateStatus={
					errors.description && touched.description
						? "error"
						: "validating"
				}
				help={touched.description && errors.description}
			>
				<TextArea
					value={values.description}
					name="description"
					onChange={handleChange}
					onBlur={handleBlur}
					autoSize={{ minRows: 3, maxRows: 5 }}
				/>
			</Form.Item>
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
