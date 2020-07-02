import React from "react";

import classes from "./Unload.module.scss";

import Page from "../../../../shared/Page";
import UnloadForm from "./UnloadForm";

const Unload = () => {
	return (
		<Page className={classes.page}>
			<UnloadForm />
		</Page>
	);
};

export default Unload;
