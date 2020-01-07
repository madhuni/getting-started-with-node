import * as bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";
import mongoose, { Mongoose } from "mongoose";
import passport from "passport";
import * as path from "path";

import { options as corsConfig } from "./config/cors.config";
import { dbOptions, localConnectionString } from "./config/db.config";
import { setupPassportStrategy } from "./config/passport.config";
import { options as sessionConfig } from "./config/session.config";
import { AuthController, CoursesController, LessonsController, MainController, UsersController } from "./controllers";
import { logIncomingRequestDetails } from "./middleware";

class App {

  public app: Application;
  public authController!: AuthController;
  public mainController!: MainController;
  public lessonsController!: LessonsController;
  public coursesController!: CoursesController;
  public usersController!: UsersController;

  constructor() {
    this.app = express();
    setupPassportStrategy(passport); // setup passport strategy before setting up the middlewares
    this.setMiddlewares();
    this.setMongoConfig();
    this.setControllers();
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors(corsConfig));
    this.app.use(session(sessionConfig));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use("/", logIncomingRequestDetails);
    this.app.use("/assets", express.static(path.join(__dirname + "/public")));
  }

  private setMongoConfig(): void {
    mongoose.connect(localConnectionString, dbOptions)
      .then((res: Mongoose) => {
        console.log(
          chalk.green(`Connected to MongoDB successfully!`)
        );
      })
      .catch((err: Error) => {
        console.log(chalk.red(`Unable to Connect to the MongoDB! Terminating the process.`), err);
        process.exit(1);
      });

    mongoose.connection.on("disconnected", () => {
      console.error(
        chalk.red("MongoDB disconnected!")
      );
    });
  }

  private setControllers(): void {
    this.authController = new AuthController(this.app);
    this.mainController = new MainController(this.app);
    this.lessonsController = new LessonsController(this.app);
    this.coursesController = new CoursesController(this.app);
    this.usersController = new UsersController(this.app);
  }
}

export default new App().app;
