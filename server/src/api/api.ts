import * as express from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import actionsRouter from "./actions";
import categoriesRouter from "./categories";
import productsRouter from "./products";
import accessable, { onlyAdmin } from "../middlewars/accessable";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", onlyAdmin(usersRouter));
apiRouter.use("/categories", accessable(categoriesRouter));
apiRouter.use("/products", accessable(productsRouter));
apiRouter.use("/actions", accessable(actionsRouter));

export default apiRouter;
