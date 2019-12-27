import express, { Application, Router } from "express";

import { coursesService } from "../services";

export class CoursesController {

  private router: Router;

  constructor(private app: Application) {
    this.router = express.Router();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/courses", this.router);

    this.router.route("/").get(coursesService.getCourses);
    this.router.route("/:id").get(coursesService.getCourse);
    this.router.route("/").post(coursesService.addCourse);
  }
}
