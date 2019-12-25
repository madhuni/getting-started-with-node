import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import figlet from "figlet";
import mongoose from "mongoose";
import * as path from "path";

import { options as corsConfig } from "./config/cors.config";
import { connectionString, dbOptions } from "./config/db.config";
import { router as CoursesApiRouter } from "./routes/courses";
import { router as IndexRouter } from "./routes/index";
import { router as LessonsApiRouter } from "./routes/lessons";
import { router as UsersApiRouter } from "./routes/users";

const app: Express = express();
// Setting up the port from the Environment Variable
const port = +process.env.PORT || 1400;
const hostname = "localhost";

 // Using MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// Using CUSTOM MIDDLEWARE
console.log(__dirname);
app.use("/assets", express.static(path.join(__dirname + "/public")));
app.use("/", (req: Request, res: Response, next) => {
  console.log({
    RequestUrl: req.url,
    RequestMethod: req.method,
    IsRequestSecure: req.secure,
    RequestIP: req.ip,
  });
  next(); // this will run the method with the matching route once the middleware done the things it needs to do
});
app.use("/", IndexRouter);
app.use("/api/courses", CoursesApiRouter);
app.use("/api/lessons", LessonsApiRouter);
app.use("/api/users", UsersApiRouter);

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.send("assets/favicon.ico");
});

app.listen(port, hostname, () => {
  mongoose.connect(connectionString, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
  });
  figlet("Welcome To Node Server", (err, data) => {
    if (err) {
      console.log("Something is wrong with Figlet.");
      return;
    }
    console.log(data);
  });
  console.log(`Server is up and running at http://${hostname}:${port}`);
});
