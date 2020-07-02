import * as express from "express";
import { forbidden } from "../../errors/client-errors";
import { sendSuccess } from "../../errors/base";
import { IExtendRequest } from "../../extends/IExtendRequest";
import { UserRole } from "../../models/UserRole";

const router = express.Router();

router.post("/unload", async (req: IExtendRequest, res) => {
	const { user } = req.context!;
	if (!user!.isAdmin && user!.role !== UserRole.MOVER)
		return forbidden(res, "NO_ACCESS");

	const { name, surname, email, password, role } = req.body;
	console.log(req.body);

	sendSuccess(res)({});
});

export default router;
