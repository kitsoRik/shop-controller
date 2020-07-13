import React, { ReactChildren, ReactNode } from "react";
import { Form } from "antd";
import FormItem from "./FormItem";
import { useFormik } from "formik";

interface Props {
	className?: string;

	children: JSX.Element[] | JSX.Element;

	obSubmit?: (values: any) => void;
}

const _Form = ({ children, className }: Props) => {
	const formItems = (Array.isArray(children) ? children : [children]).filter(
		(c) => c.type === FormItem
	);
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
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
			const errors: any = {};

			formItems.forEach(({ props: { name, validate } }: any) => {
				if (!validate) return;
				const result = validate(values[name]);

				if (result) errors[name] = result;
			});

			return errors;
		},
		onSubmit: () => {
			console.log("submit");
		},
	});

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
			...newProps,
		});
	});

	return <Form className={`${className ?? ""}`}>{items}</Form>;
};

export default _Form;
