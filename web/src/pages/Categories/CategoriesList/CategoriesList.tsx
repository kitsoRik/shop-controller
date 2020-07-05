import React from "react";

import classes from "./CategoriesList.module.scss";
import { List, Skeleton, Avatar } from "antd";
import { inject, observer } from "mobx-react";
import { Store } from "../../../mobx/store";
import { Link } from "react-router-dom";

interface Props {
	store?: Store;
}

const CategoriesList = ({ store }: Props) => {
	return (
		<List
			className={classes.list}
			loading={false}
			header={"Категорії"}
			itemLayout="horizontal"
			dataSource={store!.categories.categories}
			locale={{ emptyText: "Немає категорій" }}
			renderItem={({ id, name, description }) => (
				<List.Item
					actions={[<Link to={`/categories/${id}/edit`}>edit</Link>]}
				>
					<Skeleton avatar title={false} loading={false} active>
						<List.Item.Meta
							avatar={
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							}
							title={<a href="https://ant.design">{`${name}`}</a>}
							description={description}
						/>
						<div>content</div>
					</Skeleton>
				</List.Item>
			)}
		/>
	);
};

export default inject("store")(observer(CategoriesList));
