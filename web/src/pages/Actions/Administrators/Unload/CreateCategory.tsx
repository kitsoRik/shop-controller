import React from "react";

import classes from "./CreateCategory.module.scss";

import Page from "../../../../shared/Page";
import CategoryForm from "../../../../shared/CategoryForm";
import api from "../../../../providers/api";

const CreateCategory = () => {
	return (
		<Page className={classes.page}>
			<CategoryForm
				initialValues={{ name: "", description: "" }}
				apiMethod={api.actions.administrators.createCategory}
			/>
		</Page>
	);
};

export default CreateCategory;
