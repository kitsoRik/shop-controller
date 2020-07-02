import React, { useState } from "react";
import {} from "react-router-dom";
import classes from "./Drawer.module.scss";
import { User } from "../../mobx/user";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router";
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";

interface Props {
	user?: User;
}

const Drawer = ({ user }: Props) => {
	const [visible, setVisible] = useState(true);
	const history = useHistory();

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsedHandle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className={classes.drawer}>
			<Menu
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
				inlineCollapsed={collapsed}
				style={{ height: "100%" }}
			>
				<SubMenu key="sub1" icon={<MailOutlined />} title="Користувачі">
					<Menu.Item
						key="create"
						icon={<PieChartOutlined />}
						onClick={() => history.push("/users/create")}
					>
						Створити
					</Menu.Item>
					<Menu.Item
						key="admins"
						onClick={() => history.push("/users/administrators")}
					>
						Адміністратори
					</Menu.Item>
					<Menu.Item
						key="sellers"
						onClick={() => history.push("/users/sellers")}
					>
						Продавці
					</Menu.Item>
					<Menu.Item
						key="movers"
						onClick={() => history.push("/users/movers")}
					>
						Гружчики
					</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default inject("user")(observer(Drawer));
