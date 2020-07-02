import * as express from "express";
import { forbidden } from "../../errors/client-errors";
import { sendSuccess } from "../../errors/base";
import User from "../../db/models/users";
import { IExtendRequest } from "../../extends/IExtendRequest";

const router = express.Router();

router.post("/", async (req: IExtendRequest, res) => {
	const { user } = req.context!;
	console.log(req.body);
	if (!user.isAdmin) return forbidden(res, "NO_ACCESS");

	const { name, surname, email, password, role } = req.body;

	const createdUser = await User.createUser(
		name,
		surname,
		email,
		password,
		role
	);

	sendSuccess(res)({
		user: createdUser,
	});
});

router.get("/administrators", async (req: IExtendRequest, res) => {
	const { user } = req.context!;

	if (!user.isAdmin) {
		return forbidden(res, "NO_ACCESS");
	}

	const { offset, limit } = req.body;

	const administrators = await User.getUsersByRole(
		"administrator",
		offset,
		limit
	);

	sendSuccess(res)({
		administrators,
	});
});

router.put("/administrators/:id", async (req: IExtendRequest, res) => {
	const { user } = req.context!;

	if (!user || !user.isAdmin) {
		return forbidden(res, "NO_ACCESS");
	}

	const { id } = req.params;
	const { name, surname, email, role }: any = req.query;

	const changedUser = await User.changeUser(id, {
		name,
		surname,
		email,
		role,
	});

	sendSuccess(res)({
		changedUser,
	});
});

export default router;
