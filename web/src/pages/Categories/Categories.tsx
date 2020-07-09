import React, { useEffect } from "react";
import Page from "../../shared/Page";
import CategoriesList from "./CategoriesList";
import { useLocationQuery } from "react-use-location-query";
import { inject, observer } from "mobx-react";
import { Store } from "../../mobx/store";

interface Props {
	store?: Store;
}

const Categories = ({ store }: Props) => {
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
		<Page>
			<CategoriesList />
		</Page>
	);
};

export default inject("store")(observer(Categories));
