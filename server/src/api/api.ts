import * as express from "express";
import authRouter from "./auth";
import usersRouter from "./users";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
