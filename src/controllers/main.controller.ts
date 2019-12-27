import { Application } from "express";

import { commonService } from "../services";

export class MainController {

  constructor(private app: Application) {
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.route("/").get(commonService.showWelcomeMessage);
    this.app.route("/favicon.ico").get(commonService.getFavicon);
  }
}
