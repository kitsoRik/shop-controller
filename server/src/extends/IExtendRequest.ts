import * as express from "express";
import * as core from "express-serve-static-core";
import { IUser } from "../models/IUser";

export interface IExtendRequest
	extends express.Request<core.ParamsDictionary, any, any, core.Query> {
	context?: {
		user: IUser | null;
	};
}
