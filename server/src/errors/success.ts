import * as express from "express";
import { sendError } from "./base";

export const unauthorized = (
	response: express.Response<any>,
	type: string,
	body: object = {}
) => {
	sendError(response.status(400))(type, body);
};
