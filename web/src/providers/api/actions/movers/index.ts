import { post } from "../../api";

export const unload = (invoiceNumber: number) => {
	return post("/actions/movers/unload/", { invoiceNumber });
};
