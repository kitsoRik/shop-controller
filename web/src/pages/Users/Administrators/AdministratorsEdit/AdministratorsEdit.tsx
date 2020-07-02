import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { useHistory, useParams } from "react-router";
import { IUser } from "../../../../models/IUser";
import AdministratorsEditForm from "./AdministratorsEditForm";
import { AdministratorsEditFormSubmit } from "./AdministratorsEditForm/AdministratorsEditForm";
import api from "../../../../providers/api";
import { inject, observer } from "mobx-react";
import { Store } from "../../../../mobx/store";

interface Props {
	store?: Store;
	users: IUser[];
}

const AdministratorsEdit = ({ users, store }: Props) => {
	const { users: storeUsers } = store!;

	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const handleClose = () => {
		history.push("/users/administrators/");
	};

	const user = users.find((u) => u.id === id);

	const handleSubmit: AdministratorsEditFormSubmit = async ({
		name,
		surname,
		email,
		role,
	}) => {
		try {
			const {
				data: {
					result: { changedUser },
				},
			} = await api.users.putAdministrator(
				id,
				name,
				surname,
				email,
				role
			);
			storeUsers.appendUser(changedUser);
		} catch (e) {
			console.log(e);
			console.log(JSON.stringify(e));
		}
	};

	if (!user) return null;

	return (
		<Modal title="Редагування користувача" visible={true}>
			<AdministratorsEditForm
				name={user.name}
				surname={user.surname}
				email={user.email}
				role={user.role}
				handleSubmit={handleSubmit}
			/>
		</Modal>
	);
};

export default inject("store")(observer(AdministratorsEdit));
