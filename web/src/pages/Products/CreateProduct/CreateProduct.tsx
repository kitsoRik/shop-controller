import React, { useState } from "react";

import classes from "./CreateProduct.module.scss";

import CreateProductForm from "../ProductForm";
import { useLocationQuery } from "react-location-query";
import Page from "../../../shared/Page";
import { inject, observer } from "mobx-react";
import { ProductsStore } from "../../../mobx/products-store";

interface Props {
	productsStore?: ProductsStore;
}

const CreateProduct = ({ productsStore }: Props) => {
	useLocationQuery({});

	const [loading, setLoading] = useState(false);

	return (
		<Page className={classes.page}>
			<CreateProductForm
				loading={loading}
				onSubmit={async ({ category, name, price }: any) => {
					console.log(name);
					setLoading(true);
					try {
						await productsStore!.createProduct(
							name,
							category,
							price
						);
					} catch (e) {
						console.log(e);
						JSON.stringify(e);
					}
					setLoading(false);
				}}
			/>
		</Page>
	);
};

export default inject("productsStore")(observer(CreateProduct));
