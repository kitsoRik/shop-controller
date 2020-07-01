import * as express from "express";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import { connect as connectCors } from "./cors";
import { sendError, sendSuccess } from "./errors/base";
import { unauthorized } from "./errors/client-errors";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

connectCors(app);

app.post("/api/auth", (req, res) => {
	const { email, password } = req.body;

	if (email !== "m@m.m") return unauthorized(res, "BAD_DATA");

	if (password !== "123123123") return unauthorized(res, "BAD_DATA");

	sendSuccess(res)({
		user: {
			id: 0,
			email,
			name: "Rostyslav",
		},
	});
});

app.listen(3500, () => console.log("Listening 3500 port"));
