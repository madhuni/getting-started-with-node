import * as bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express, { Application } from "express";
import mongoose, { Mongoose } from "mongoose";
import * as path from "path";

import { options as corsConfig } from "./config/cors.config";
import { dbOptions, localConnectionString } from "./config/db.config";
import { CoursesController } from "./controllers/courses.controller";
import { LessonsController } from "./controllers/lessons.controller";
import { MainController } from "./controllers/main.controller";
import { UsersController } from "./controllers/users.controller";
import { CommonService } from "./services/common.service";

class App {

  public app: Application;
  public mainController!: MainController;
  public lessonsController!: LessonsController;
  public coursesController!: CoursesController;
  public usersController!: UsersController;

  private _commonSvc: CommonService;

  constructor() {
    this.app = express();
    this._commonSvc = new CommonService();
    // Setup the MongoDB first and then setup the Middlewares and Controllers
    this.setMongoConfig()
      .then((res: Mongoose) => {
        console.log(
          chalk.green(`Connected to MongoDB successfully!`)
        );
        this.setMiddlewares();
        this.setControllers();
      })
      .catch((err: Error) => {
        console.log(chalk.red(`Unable to Connect to the MongoDB!`), err);
        process.exit(1);
      });
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors(corsConfig));
    this.app.use("/", this._commonSvc.logIncomingRequestDetails);
    this.app.use("/assets", express.static(path.join(__dirname + "/public")));
  }

  private setMongoConfig(): Promise<Mongoose> {
    mongoose.Promise = global.Promise;
    return mongoose.connect(localConnectionString, dbOptions);
  }

  private setControllers(): void {
    this.mainController = new MainController(this.app);
    this.lessonsController = new LessonsController(this.app);
    this.coursesController = new CoursesController(this.app);
    this.usersController = new UsersController(this.app);
  }
}

export default new App().app;
