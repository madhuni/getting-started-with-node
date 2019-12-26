import express, { Application, Router } from "express";

import { LessonsService } from "../services/lessons.service";

export class LessonsController {

  private router: Router;
  private _lessonsSvc: LessonsService;

  constructor(private app: Application) {
    this.router = express.Router();
    this._lessonsSvc = new LessonsService();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/lessons", this.router);

    this.router.route("/").get(this._lessonsSvc.getLessons);
    this.router.route("/:id").get(this._lessonsSvc.getLesson);
  }
}
