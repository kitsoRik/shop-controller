import * as express from "express";
import Session from "../db/models/sessions";
import User from "../db/models/users";
import { IExtendRequest } from "../extends/IExtendRequest";

export const connect = (app: express.Express) => {
	app.use(async (req: IExtendRequest, res, next) => {
		const { sesid } = req.cookies;
		const session: any = await Session.getSessionBySesid(sesid);

		req.context = {
			user: null,
		};

		if (!sesid) return next();

		const user: any = await User.getUserById(session.userId);

		if (!user) throw new Error("Unknwon user id");

		req.context.user = user;

		next();
	});
};
