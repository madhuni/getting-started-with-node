import * as bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import figlet from "figlet";
import mongoose from "mongoose";
import * as path from "path";

import { options as corsConfig } from "./config/cors.config";
import { dbOptions, localConnectionString, remoteConnectionString } from "./config/db.config";
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

/**
 * Connect to the DB first and after the connection is established
 * successfully then start the Node server.
 */
mongoose.connect(localConnectionString, dbOptions, (err) => {
  if (err) {
    console.log(chalk.red(`Unable to Connect to the server!`), err);
    process.exit(1);
  } else {
    // Start the APP once the DB is connected
    app.listen(port, hostname, () => {
      figlet("Welcome To Node Server", function(err, data) {
        if (err) {
          console.log("Something is wrong with Figlet.");
          return;
        }
        console.log(data);
      });
      console.log(chalk.green(`Server is up and running at http://${hostname}:${port}`));
    });
  }
});
