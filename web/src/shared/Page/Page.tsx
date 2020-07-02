import React from "react";

import styles from "./Page.module.scss";

interface IPage
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

const Page = ({ children, className, ...props }: IPage) => {
	return (
		<div className={`${styles.page} ${className ?? ""}`} {...props}>
			{children}
		</div>
	);
};

export default Page;
