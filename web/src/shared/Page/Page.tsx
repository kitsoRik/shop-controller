import React from "react";

import styles from "./Page.module.scss";

interface IPage {
	children: JSX.Element;
	className?: string;
}

const Page = ({ children, className, ...props }: IPage | any) => {
	return (
		<div className={`${styles.page} ${className ?? ""}`} {...props}>
			{children}
		</div>
	);
};

export default Page;
