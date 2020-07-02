import * as cors from "cors";
import * as express from "express";

export const connect = (app: express.Express) => {
	app.use(
		cors({
			credentials: true,
			origin: (_, cb) => {
				cb(null, true);
			},
		})
	);
};
