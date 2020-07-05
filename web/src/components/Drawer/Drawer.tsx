import React, { useState } from "react";
import {} from "react-router-dom";
import classes from "./Drawer.module.scss";
import { User } from "../../mobx/user";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router";
import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { UserRole } from "../../models/UserRole";

interface Props {
	user?: User;
}

const Drawer = ({ user }: Props) => {
	const history = useHistory();

	const [collapsed, setCollapsed] = useState(false);
	console.log(user?.role);
	return (
		<div className={classes.drawer}>
			<Menu
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
				inlineCollapsed={collapsed}
				style={{ height: "100%" }}
			>
				{user?.isAdmin && adminItems(history)}
				{user?.role === UserRole.MOVER && moverItems(history)}
				{user?.role === UserRole.MANAGER && managerItems(history)}
				{user?.role === UserRole.ADMINISTRATOR &&
					administratorItems(history)}
			</Menu>
		</div>
	);
};

const adminItems = (history: any) => [
	<SubMenu key="users" icon={<MailOutlined />} title="Користувачі">
		<Menu.Item
			key="create"
			icon={<PieChartOutlined />}
			onClick={() => history.push("/users/create")}
		>
			Створити
		</Menu.Item>
		<Menu.Item
			key={UserRole.ADMINISTRATOR}
			onClick={() => history.push(`/users/${UserRole.ADMINISTRATOR}s`)}
		>
			Адміністратори
		</Menu.Item>
		<Menu.Item
			key={UserRole.SELLER}
			onClick={() => history.push(`/users/${UserRole.SELLER}s`)}
		>
			Продавці
		</Menu.Item>
		<Menu.Item
			key={UserRole.MOVER}
			onClick={() => history.push(`/users/${UserRole.MOVER}s`)}
		>
			Гружчики
		</Menu.Item>
		<Menu.Item
			key={UserRole.MANAGER}
			onClick={() => history.push(`/users/${UserRole.MANAGER}s`)}
		>
			Менеджери
		</Menu.Item>
	</SubMenu>,

	<SubMenu key="actions" icon={<PieChartOutlined />} title="Статистика">
		<SubMenu
			key="movers_actions"
			icon={<PieChartOutlined />}
			title="Дії гружчиків"
		>
			{moverItems(history)}
		</SubMenu>
	</SubMenu>,
];

const moverItems = (history: any) => [
	<Menu.Item
		key="unload"
		icon={<PieChartOutlined />}
		onClick={() => history.push("/actions/movers/unload")}
	>
		Розвантажити товар
	</Menu.Item>,
];

const managerItems = (history: any) => [
	<Menu.Item
		key="create-product"
		icon={<PieChartOutlined />}
		onClick={() =>
			history.push(`/actions/${UserRole.MANAGER}s/create-product`)
		}
	>
		Додати продукт
	</Menu.Item>,
	<Menu.Item
		key="products"
		icon={<PieChartOutlined />}
		onClick={() => history.push("/products/")}
	>
		Продукти
	</Menu.Item>,
];

const administratorItems = (history: any) => [
	<Menu.Item
		key="create-product"
		icon={<PieChartOutlined />}
		onClick={() =>
			history.push(`/actions/${UserRole.ADMINISTRATOR}s/create-category`)
		}
	>
		Створити категорію
	</Menu.Item>,
	<Menu.Item
		key="categories"
		icon={<PieChartOutlined />}
		onClick={() => history.push("/categories/")}
	>
		Категорії
	</Menu.Item>,
];

export default inject("user")(observer(Drawer));
