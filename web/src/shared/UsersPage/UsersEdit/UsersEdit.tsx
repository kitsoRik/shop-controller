import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { useHistory, useParams } from "react-router";
import { IUser } from "../../../models/IUser";
import { Users } from "../../../mobx/users";
import { useFormik } from "formik";
import { userValidator } from "../../../providers/validator/user-validator";
import UsersEditForm from "./UsersEditForm";
import { inject, observer } from "mobx-react";
import { Store } from "../../../mobx/store";
import api from "../../../providers/api";
import { notification } from "antd";
import { useLocationQuery } from "react-use-location-query";

interface Props {
	store?: Store;
}

const UsersEdit = ({ store }: Props) => {
	const { users } = store!;

	const {
		fullQuery: { edit },
		setQueryField,
	} = useLocationQuery({});

	const user = users.getUserById(edit as any);
	if (!user) return null;

	const handleClose = () => {
		setQueryField("edit", "none");
	};

	return (
		<UsersEditHelper user={user} users={users} handleClose={handleClose} />
	);
};

interface HelperProps {
	user: IUser;
	users: Users;
	handleClose: () => void;
}

const UsersEditHelper = ({ users, user, handleClose }: HelperProps) => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		handleSubmit,
		handleChange,
		handleBlur,
		isValid,
		initialValues,
	} = useFormik({
		initialValues: {
			name: user.name,
			surname: user.surname,
			email: user.email,
			role: user.role,
			description: user.description,
		},
		validate: userValidator,
		onSubmit: async ({ name, surname, email, role, description }) => {
			try {
				const {
					data: {
						result: { changedUser },
					},
				} = await api.users.putAdministrator(
					user.id,
					name,
					surname,
					email,
					role,
					description
				);
				users.appendUser(changedUser);
				handleClose();
				notification.success({
					message: `Користувача ${user.name} успішно змінено`,
					placement: "bottomLeft",
				});
			} catch (e) {
				console.log(e);
				console.log(JSON.stringify(e));
			}
		},
	});

	const submitButtonDisabled =
		!isValid ||
		(values.name === initialValues.name &&
			values.surname === initialValues.surname &&
			values.email === initialValues.email &&
			values.role === initialValues.role &&
			values.description === initialValues.description);

	return (
		<Modal
			title="Редагування користувача"
			visible={true}
			onOk={() => handleSubmit()}
			onCancel={handleClose}
			okText="Змінити"
			cancelText="Скасувати"
			okButtonProps={{ disabled: submitButtonDisabled }}
			keyboard={false}
			closable={false}
			maskClosable={false}
		>
			<UsersEditForm
				values={values}
				errors={errors as any}
				touched={touched as any}
				setFieldValue={setFieldValue}
				setFieldTouched={setFieldTouched}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
		</Modal>
	);
};

export default inject("store")(observer(UsersEdit));
