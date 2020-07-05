import React from "react";
import Page from "../../shared/Page";
import CategoriesList from "./CategoriesList";
import { useLocationQuery } from "react-use-location-query";

const Categories = () => {
	const { query } = useLocationQuery({
		edit: {
			type: "boolean",
			default: false,
			hideIfDefault: true,
		},
	});

	return (
		<Page>
			<CategoriesList />
		</Page>
	);
};

export default Categories;
