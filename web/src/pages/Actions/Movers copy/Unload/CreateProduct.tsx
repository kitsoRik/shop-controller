import React from "react";

import classes from "./CreateProduct.module.scss";

import Page from "../../../../shared/Page";
import CreateProductForm from "./CreateProductForm";
import { useLocationQuery } from "react-location-query";

const CreateProduct = () => {
	useLocationQuery({});
	return (
		<Page className={classes.page}>
			<CreateProductForm />
		</Page>
	);
};

export default CreateProduct;
