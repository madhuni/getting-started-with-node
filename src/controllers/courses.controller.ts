import express, { Application, Router } from "express";

import { CoursesService } from "../services";

export class CoursesController {

  private router: Router;
  private _coursesSvc: CoursesService;

  constructor(private app: Application) {
    this.router = express.Router();
    this._coursesSvc = new CoursesService();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/courses", this.router);

    this.router.route("/").get(this._coursesSvc.getCourses);
    this.router.route("/:id").get(this._coursesSvc.getCourse);
    this.router.route("/").post(this._coursesSvc.addCourse);
  }
}
