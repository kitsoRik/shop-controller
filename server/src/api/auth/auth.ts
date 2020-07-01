import * as express from "express";
import { unauthorized } from "../../errors/client-errors";
import { sendSuccess } from "../../errors/base";
import User from "../../db/models/users";
import Session from "../../db/models/sessions";
import { internalServerError } from "../../errors/server-errors";

const router = express.Router();

router.post("/", async (req, res) => {
	const { sesid } = req.cookies;

	const session: any = await Session.getSessionBySesid(sesid);

	if (!session) {
		return unauthorized(res, "UNKNOWN_SESID");
	}

	const user: any = await User.getUserById(session.userId);

	if (!user) {
		return internalServerError(res, "UNKNWON_USER");
	}

	sendSuccess(res)({
		user,
	});
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user: any = await User.getUserByEmailAndPassword(email, password);

	if (!user) {
		return unauthorized(res, "UNKNOWN_DATA");
	}

	const { sesid }: any = await Session.createSession(user.id);

	res.cookie("sesid", sesid);

	const { id, name } = user;

	sendSuccess(res)({
		user: {
			id,
			email,
			name,
		},
	});
});

export default router;
