import * as bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";
import { MysqlError } from "mysql";
import passport from "passport";
import * as path from "path";

import { options as corsConfig } from "./config/cors.config";
import { connection } from "./config/mysql.config";
import { setupPassportStrategy } from "./config/passport.config";
import { options as sessionConfig } from "./config/session.config";
import { AuthController, MainController, UsersController } from "./controllers";
import { logIncomingRequestDetails } from "./middleware";

class App {

  public app: Application;
  public authController!: AuthController;
  public mainController!: MainController;
  public usersController!: UsersController;

  constructor() {
    this.app = express();
    setupPassportStrategy(passport); // setup passport strategy before setting up the middlewares
    this.setMiddlewares();
    this.setMysqlConnection();
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

  private setMysqlConnection(): void {
    connection.connect((err: MysqlError) => {
      if (err) {
        console.error(chalk.red(`Unable to Connect to the MYSQL! Terminating the process.`));
        process.exit(1);
      }
      console.log(chalk.green(`Connected to MYSQL successfully.`));
    });

    connection.on("end", (err: MysqlError) => {
      if (err) {
        console.error(chalk.red(err));
      }
      console.log(chalk.red("MYSQL connection ended!"));
    });
  }

  private setControllers(): void {
    this.authController = new AuthController(this.app);
    this.mainController = new MainController(this.app);
    this.usersController = new UsersController(this.app);
  }
}

export default new App().app;
