import { Application } from "express";

import { CommonService } from "../services/common.service";

export class MainController {

  private _commonSvc: CommonService;

  constructor(private app: Application) {
    this._commonSvc = new CommonService();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.route("/").get(this._commonSvc.showWelcomeMessage);
    this.app.route("/favicon.ico").get(this._commonSvc.getFavicon);
  }
}
