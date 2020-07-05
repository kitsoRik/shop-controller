import React from "react";

import classes from "./UsersList.module.scss";
import { Skeleton, List, Avatar, Button } from "antd";
import { IUser } from "../../../models/IUser";
import { Link } from "react-router-dom";
import { useLocationQuery } from "react-use-location-query";

interface Props {
	users: IUser[];
}

const AdministratorsList = ({ users }: Props) => {
	const { setQueryField } = useLocationQuery({});

	return (
		<List
			className={classes.list}
			loading={false}
			itemLayout="horizontal"
			dataSource={users}
			renderItem={({ id, surname, name, role, imageName }) => (
				<List.Item
					actions={[
						<Button onClick={() => setQueryField("edit", id)}>
							edit
						</Button>,
					]}
				>
					<Skeleton avatar title={false} loading={false} active>
						<List.Item.Meta
							avatar={
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							}
							title={
								<a href="https://ant.design">{`${surname} ${name}`}</a>
							}
							description="Відповідає за щось"
						/>
						<div>content</div>
					</Skeleton>
				</List.Item>
			)}
		/>
	);
};

export default AdministratorsList;
