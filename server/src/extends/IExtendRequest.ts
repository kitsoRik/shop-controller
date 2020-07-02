import * as express from "express";
import * as core from "express-serve-static-core";

export interface IExtendRequest
	extends express.Request<core.ParamsDictionary, any, any, core.Query> {
	context?: {
		user: any | null;
	};
}
