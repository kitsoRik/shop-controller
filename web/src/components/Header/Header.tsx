import React from "react";

import "./Header.scss";
import { observer, inject } from "mobx-react";
import { User } from "../../mobx/user";

interface Props {
	user?: User;
}

const Header = ({ user }: Props) => {
	return <header>{user!.name}</header>;
};

export default inject("user")(observer(Header));
