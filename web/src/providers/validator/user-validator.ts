import { UserRole } from "../../models/UserRole";

interface UserValidator {
	name: string;
	surname: string;
	email: string;
	password?: string;
	passwordConfirm?: string;
	role: UserRole;
	description: string;
}

export const userValidator = ({
	name,
	surname,
	email,
	password,
	passwordConfirm,
	role,
	description,
}: UserValidator) => {
	const errors: any = {};

	if (name === "") errors.name = "Ім'я не може бути пустим";
	else if (!/[a-zA-Zа-яА-ЯІЫыЁёЬьЇїЪъЄєЭэ]/.test(name))
		errors.name = "Не вірний формат ім'я";

	if (surname === "") errors.surname = "Прізвище не може бути пустим";
	else if (!/[a-zA-Zа-яА-ЯІЫыЁёЬьЇїЪъЄєЭэ]/.test(surname))
		errors.surname = "Не вірний формат прізвище";

	if (email === "") errors.email = "E-mail не може бути пустим";
	else if (!/[a-zA-Zа-яА-ЯІЫыЁёЬьЇїЪъЄєЭэ]/.test(name))
		errors.email = "Не вірний формат e-mail адреси";

	if (password !== undefined) {
		if (password === "") errors.password = "Пароль не може бути пустим";
		else if (password.length < 8)
			errors.password = "Мінімальна довжина паролю 8 символів";
		if (passwordConfirm !== password)
			errors.passwordConfirm = "Паролі не співпадають";
	}

	return errors;
};
