import React from "react";

import "./Home.scss";
import { User } from "../../mobx/user";
import { observer, inject } from "mobx-react";
import Page from "../../shared/Page";

interface Props {
	user?: User;
}

const Home = ({ user }: Props) => {
	return <Page>{user!.email}123</Page>;
};

export default observer(inject("user")(Home));
