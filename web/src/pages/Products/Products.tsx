import React from "react";
import { useLocationQueryExtend } from "react-location-query";

import Page from "../../shared/Page";
import ProductsList from "./ProductsList";
import ProductsEdit from "./UsersEdit";

const Products = () => {
	return (
		<Page>
			<ProductsList />
			<ProductsEdit />
		</Page>
	);
};

export default Products;
