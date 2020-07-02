import React, { useEffect, useState } from "react";

import "./Administrators.module.scss";
import Page from "../../../shared/Page";
import api from "../../../providers/api";
import AdministratorsList from "./AdministratorsList";
import { IUser } from "../../../models/IUser";
import AdministratorsEdit from "./AdministratorsEdit";
import { Route } from "react-router";
import { inject, observer } from "mobx-react";
import { Store } from "../../../mobx/store";

interface Props {
	store?: Store;
}

const Administrators = ({ store }: Props) => {
	const { users: storeUsers } = store!;

	useEffect(() => {
		(async () => {
			const {
				data: {
					result: { administrators },
				},
			} = await api.users.administrators(0, 10);
			storeUsers.appendUsers(administrators);
		})();
	}, []);

	return (
		<Page>
			<AdministratorsList users={store!.users.administrators} />
			<Route
				path="/users/administrators/:id/edit"
				exact
				render={() => (
					<AdministratorsEdit users={store!.users.administrators} />
				)}
			/>
		</Page>
	);
};

export default inject("store")(observer(Administrators));
