import * as express from "express";
import { forbidden } from "../../errors/client-errors";
import { sendSuccess } from "../../errors/base";
import User from "../../db/models/users";
import { IExtendRequest } from "../../extends/IExtendRequest";
import { UserRoleValues, UserRole } from "../../models/UserRole";
import Category from "../../db/models/categories";

const router = express.Router();

router.get("/", async (req: IExtendRequest, res) => {
	const { user } = req.context!;
	if (!user!.isAdmin && user!.role !== UserRole.ADMINISTRATOR) {
		return forbidden(res, "NO_ACCESS");
	}

	const { offset, limit }: any = req.query;
	console.log(offset, limit);

	const categories = await Category.getCategories()
		.skip(parseInt(offset))
		.limit(parseInt(limit));
	const categoriesNumbers = await Category.getCategories().countDocuments();

	sendSuccess(res)({
		categories,
		categoriesNumbers,
	});
});

router.put(`/`, async (req: IExtendRequest, res) => {
	const { user } = req.context!;
	if (!user!.isAdmin && user!.role !== UserRole.ADMINISTRATOR) {
		return forbidden(res, "NO_ACCESS");
	}

	const { name, description } = req.query;

	const users = await Category.createCategory(
		name as string,
		description as string
	);

	sendSuccess(res)({
		users,
	});
});

router.put("/:id", async (req: IExtendRequest, res) => {
	const { user } = req.context!;

	if (!user || !user.isAdmin) {
		return forbidden(res, "NO_ACCESS");
	}

	const { id } = req.params;
	const { name, surname, email, role, description }: any = req.query;

	const changedUser = await User.changeUser(id, {
		name,
		surname,
		email,
		role,
		description,
	});

	sendSuccess(res)({
		changedUser,
	});
});

export default router;
