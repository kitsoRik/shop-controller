import { forbidden } from "../errors/client-errors";
import { Response, NextFunction } from "express";
import { IExtendRequest } from "../extends/IExtendRequest";

export default (fn: FunctionType) => (
	req: IExtendRequest,
	res: Response<any>,
	next: NextFunction
) => {
	const { user } = req.context!;

	if (!user) {
		return forbidden(res, "NO_ACCESS");
	}

	fn(req, res, next);
};

export const onlyAdmin = (fn: FunctionType) => (
	req: IExtendRequest,
	res: Response<any>,
	next: NextFunction
) => {
	const { user } = req.context!;

	if (!user || !user.isAdmin) {
		return forbidden(res, "NO_ACCESS");
	}

	fn(req, res, next);
};

type FunctionType = (
	req: IExtendRequest,
	res: Response<any>,
	next: NextFunction
) => void;
