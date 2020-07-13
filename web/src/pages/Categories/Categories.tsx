import React, { useEffect } from "react";
import Page from "../../shared/Page";
import CategoriesList from "./CategoriesList";
import { inject, observer } from "mobx-react";
import { Store } from "../../mobx/store";

interface Props {
	store?: Store;
}

const Categories = ({ store }: Props) => {
	return (
		<Page>
			<CategoriesList />
		</Page>
	);
};

export default inject("store")(observer(Categories));
