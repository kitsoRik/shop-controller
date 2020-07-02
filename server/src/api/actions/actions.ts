import * as express from "express";
import moversRouter from "./movers";

const router = express.Router();

router.use("/movers", moversRouter);

export default router;
