import * as express from "express";
import moversRouter from "./movers";
import admninistratorsRouter from "./admninistrators";
import { UserRole } from "../../models/UserRole";

const router = express.Router();

router.use(`/${UserRole.MOVER}s`, moversRouter);
router.use(`/${UserRole.ADMINISTRATOR}s`, admninistratorsRouter);

export default router;
