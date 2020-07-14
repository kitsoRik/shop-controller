import React from "react";
import FormItemInput, { Props as FormItemInputProps } from "./FormItemInput";
import FormItemButton, { Props as FormItemButtonProps } from "./FormItemButton";
import FormItemSelect, { Props as FormItemSelectProps } from "./FormItemSelect";

type Props = FormItemInputProps | FormItemButtonProps | FormItemSelectProps;

export type FormItemType = (props: Props) => React.Component;

const FormItem = (props: Props) => {
	switch (props.type) {
		case "input":
			return <FormItemInput {...props} />;
		case "button":
			return <FormItemButton {...props} />;
		case "select":
			return <FormItemSelect {...props} />;
	}
};

export default FormItem;
