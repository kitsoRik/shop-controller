import { List, Skeleton } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocationQuery } from "react-use-location-query";
import { Store } from "../../../mobx/store";

import classes from "./ProductsList.module.scss";

interface Props {
	store?: Store;
}

const ProductsList = ({ store }: Props) => {
	const {
		query: { page, limit },
	} = useLocationQuery({
		page: {
			type: "number",
			initial: 1,
		},
		limit: {
			type: "number",
			initial: 10,
			hideIfInitial: true,
		},
	});
	useEffect(() => {
		store?.categories.loadCategories(page as number, limit as number);
	}, []);
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

export default ProductsList;
