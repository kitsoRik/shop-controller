import React from "react";

import classes from "./AdministratorsList.module.scss";
import { Skeleton, List, Avatar } from "antd";
import { IUser } from "../../../../models/IUser";
import { Link } from "react-router-dom";

interface Props {
	users: IUser[];
}

const AdministratorsList = ({ users }: Props) => {
	return (
		<List
			className={classes.list}
			loading={false}
			itemLayout="horizontal"
			dataSource={users}
			renderItem={({ id, surname, name, imageName }) => (
				<List.Item
					actions={[
						<Link to={`/users/administrators/${id}/edit`}>
							edit
						</Link>,
						<a key="list-loadmore-more">more</a>,
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
