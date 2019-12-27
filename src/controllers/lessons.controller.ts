import express, { Application, Router } from "express";

import { lessonsService } from "../services";

export class LessonsController {

  private router: Router;

  constructor(private app: Application) {
    this.router = express.Router();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/lessons", this.router);

    this.router.route("/").get(lessonsService.getLessons);
    this.router.route("/:id").get(lessonsService.getLesson);
  }
}
