import * as express from "express";

export const sendError = (response: express.Response<any>) => (
	type: string,
	body: object = {}
) => {
	response.send({
		error: {
			...body,
			type,
		},
	});
};

export const sendSuccess = (response: express.Response<any>) => (
	result: object = {}
) => {
	response.send({
		result,
	});
};
