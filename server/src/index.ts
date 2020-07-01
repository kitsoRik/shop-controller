import * as express from "express";
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import { connect as connectCors } from "./cors";
import { connect as connectDB } from "./db/db";
import apiRouter from "./api/api";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

connectCors(app);
connectDB();

app.use("/api", apiRouter);

app.listen(3500, () => console.log("Listening 3500 port"));
