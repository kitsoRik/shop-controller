import React from "react";
import FormItemInput, { Props as FormItemInputProps } from "./FormItemInput";
import FormItemButton, { Props as FormItemButtonProps } from "./FormItemButton";

type Props = FormItemInputProps | FormItemButtonProps;

export type FormItemType = (props: Props) => React.Component;

const FormItem = (props: Props) => {
	switch (props.type) {
		case "input":
			return <FormItemInput {...props} />;

		case "button":
			return <FormItemButton {...props} />;
	}
};

export default FormItem;
