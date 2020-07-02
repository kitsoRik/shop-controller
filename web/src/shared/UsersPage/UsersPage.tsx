import React, { useEffect } from "react";

import "./UsersPage.module.scss";
import Page from "../Page";
import UsersList from "./UsersList";
import UsersEdit from "./UsersEdit";
import { Route } from "react-router";
import { inject, observer } from "mobx-react";
import { Store } from "../../mobx/store";
import { UserRole } from "../../models/UserRole";
import api from "../../providers/api";

interface Props {
	role: UserRole;
	store?: Store;
}

const UsersPage = ({ store, role }: Props) => {
	const { users } = store!;

	useEffect(() => {
		(async () => {
			const {
				data: {
					result: { users: usersFromServer },
				},
			} = await api.users.users(role, 0, 10);
			users.appendUsers(usersFromServer);
		})();
	}, [role]);

	return (
		<Page>
			<UsersList users={store!.users.getUsersByRole(role)} />
			<Route
				path={`/users/${role}s/:id/edit`}
				exact
				render={() => <UsersEdit />}
			/>
		</Page>
	);
};

export default inject("store")(observer(UsersPage));
