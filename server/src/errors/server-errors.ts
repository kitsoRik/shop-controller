import * as express from "express";
import { sendError } from "./base";

export const internalServerError = (
	response: express.Response<any>,
	type: string,
	body: object = {}
) => {
	sendError(response.status(500))(type, body);
};
