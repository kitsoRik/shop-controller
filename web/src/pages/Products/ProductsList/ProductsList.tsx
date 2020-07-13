import { List, Skeleton } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { useLocationQuery } from "react-location-query";
import { Link } from "react-router-dom";
import { ProductsStore } from "../../../mobx/products-store";
import { Store } from "../../../mobx/store";

import classes from "./ProductsList.module.scss";

interface Props {
	productsStore?: ProductsStore;
}

const ProductsList = ({ productsStore }: Props) => {
	const {
		query: { page },
		setQueryField,
	} = useLocationQuery({
		page: {
			type: "number",
			initial: 1,
		},
		edit: {
			type: "string",
			initial: "",
			hideIfInitial: true,
		},
		limit: {
			type: "number",
			initial: 10,
			hideIfInitial: true,
		},
	});
	useEffect(() => {
		productsStore!.loadProducts(page as number);
	}, [page]);

	return (
		<List
			className={classes.list}
			loading={false}
			header={"Категорії"}
			itemLayout="horizontal"
			dataSource={productsStore!.products}
			locale={{ emptyText: "Немає категорій" }}
			renderItem={({ id, name, category }) => (
				<List.Item
					actions={[
						<Link
							to=""
							onClick={(e) => {
								e.preventDefault();
								setQueryField("edit", id);
							}}
						>
							Редагувати
						</Link>,
					]}
				>
					<Skeleton avatar title={false} loading={false} active>
						<List.Item.Meta
							title={<a href="https://ant.design">{`${name}`}</a>}
							description={"123"}
						/>
						<div>content</div>
					</Skeleton>
				</List.Item>
			)}
		/>
	);
};

export default inject("productsStore")(observer(ProductsList));
