import React from "react";

import classes from "./Header.module.scss";
import { observer, inject } from "mobx-react";
import { User } from "../../mobx/user";
import { Button } from "evergreen-ui";
import { PageHeader } from "antd";

interface Props {
	user?: User;
}

const Header = ({ user }: Props) => {
	return <header className={classes.header}></header>;
};

export default inject("user")(observer(Header));
