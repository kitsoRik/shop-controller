export interface FormItemPropsBase {
	name?: string;
	label?: string;
	validate?: (value: string) => string | undefined;
	error?: string;
	touched?: boolean;
	value?: string;
	initialValue?: string;
	handleChange?: (e: any) => any;
	handleBlur?: (e: any) => any;
}
