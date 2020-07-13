import React from "react";

import Page from "../../shared/Page";
import ProductsList from "./ProductsList";
import ProductsEditForm from "./UsersEdit/ProductsEditForm";

const Products = () => {
	return (
		<Page>
			<ProductsList />
			<ProductsEditForm />
		</Page>
	);
};

export default Products;
