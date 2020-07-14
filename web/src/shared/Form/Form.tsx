import React, { ReactChildren, ReactNode, useEffect } from "react";
import { Form } from "antd";
import FormItem from "./FormItem";
import { FormikHelpers, useFormik } from "formik";

interface Props {
	className?: string;

	children: (JSX.Element | boolean)[] | JSX.Element | boolean;

	onSubmit: (values: { [x: number]: any }) => void;
	onValuesChange?: (values: { [x: number]: any }) => void;
	onValidChange?: (valid: boolean, values: { [x: number]: any }) => void;
}

const _Form = ({
	children,
	className,
	onSubmit,
	onValuesChange,
	onValidChange,
}: Props) => {
	const formItems: JSX.Element[] = (Array.isArray(children)
		? children
		: [children]
	).filter(
		(c) => typeof c === "object" && c.type === FormItem
	) as JSX.Element[];
	const {
		isValid,
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
		setFieldTouched,
	} = useFormik({
		initialValues: {
			...formItems
				.map(({ props }: any) => {
					const { name, initialValue } = props;
					return {
						[name]: initialValue,
					};
				})
				.reduce((p, c) => ({ ...p, ...c }), {}),
		},
		validate: (values) => {
			if (onValuesChange) onValuesChange(values);

			const errors: any = {};

			formItems.forEach(({ props: { name, validate } }: any) => {
				if (!validate) return;
				const result = validate(values[name]);

				if (result) errors[name] = result;
			});
			return errors;
		},
		onSubmit,
	});

	useEffect(() => {
		if (onValidChange) onValidChange(isValid, values);
	}, [isValid, values, onValidChange]);

	let items: ReactNode[] = formItems.map((c) => {
		const { props } = c;
		const { name, type }: any = props;

		const newProps: any = {};

		if (type === "button") {
			if (props.isSubmit) newProps.handleSubmit = handleSubmit;
		}

		return React.cloneElement(c, {
			error: errors[name],
			touched: touched[name],
			value: values[name],
			handleChange,
			handleBlur,
			setFieldValue,
			setFieldTouched,
			...newProps,
		});
	});

	return <Form className={`${className ?? ""}`}>{items}</Form>;
};

export default _Form;
