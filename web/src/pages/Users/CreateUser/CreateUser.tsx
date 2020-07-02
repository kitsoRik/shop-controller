import React, { useState } from "react";

import classes from "./CreateUser.module.scss";
import Page from "../../../shared/Page";
import CreateUserForm from "./CreateUserForm";
import { useFormik } from "formik";
import api from "../../../providers/api";

const CreateUser = () => {
	const handleSubmit = async ({
		name,
		surname,
		email,
		password,
		role,
	}: {
		name: string;
		surname: string;
		email: string;
		password: string;
		role: string;
	}) => {
		try {
			const {
				data: {
					result: { user },
				},
			} = await api.users.createUser(
				name,
				surname,
				email,
				password,
				role
			);
			console.log(user);
		} catch (e) {
			console.log(e);
			console.log(JSON.stringify(e));
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
			passwordConfirm: "",
			role: "",
		},
		validate: ({ name, surname, email, password, passwordConfirm }) => {
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

			if (password === "") errors.password = "Пароль не може бути пустим";
			else if (password.length < 8)
				errors.password = "Мінімальна довжина паролю 8 символів";
			if (passwordConfirm !== password)
				errors.passwordConfirm = "Паролі не співпадають";

			return errors;
		},
		onSubmit: handleSubmit,
	});

	return (
		<Page className={classes.page}>
			<CreateUserForm formik={formik} />
		</Page>
	);
};

export default CreateUser;
