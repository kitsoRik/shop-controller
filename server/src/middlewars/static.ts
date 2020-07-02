import * as express from "express";

export const connect = (app: express.Express) => {
	app.use("/static", express.static("../../static"));
};
