import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { connect as connectCors } from "./middlewars/cors";
import { connect as connectDB } from "./db/db";
import apiRouter from "./api/api";
import { connect as connectContext } from "./middlewars/context";
import { connect as connectStatic } from "./middlewars/static";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
connectStatic(app);

connectCors(app);
connectDB();
connectContext(app);

app.use("/api", apiRouter);

app.listen(3500, () => console.log("Listening 3500 port"));
