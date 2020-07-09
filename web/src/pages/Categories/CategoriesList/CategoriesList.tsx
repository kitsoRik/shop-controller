import React, { useEffect } from "react";

import classes from "./CategoriesList.module.scss";
import { List, Skeleton, Avatar } from "antd";
import { inject, observer } from "mobx-react";
import { Store } from "../../../mobx/store";
import { Link } from "react-router-dom";
import { useLocationQuery } from "react-use-location-query";

interface Props {
	store?: Store;
}

const CategoriesList = ({ store }: Props) => {
	const {
		fullQuery: { page },
	} = useLocationQuery({});
	return (
		<List
			className={classes.list}
			loading={false}
			header={"Категорії"}
			itemLayout="horizontal"
			dataSource={store!.categories.categoriesByPage(page as number)}
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
