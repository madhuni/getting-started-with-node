import { Request, Response } from "express";

import { COURSES } from "../data/data";

class CoursesService {

  private currentId = 4;

  public getCourses(req: Request, res: Response): void {
    const data = {
      payload: Object.values(COURSES)
    };
    res.status(200).json(data);
  }

  public getCourse(req: Request, res: Response): void {
    const courseId = req.params.id;
    if (COURSES[courseId] !== undefined) {
      res.json(COURSES[courseId]);
    } else {
      res.status(400).json({message: "Course not found"});
    }
  }

  public addCourse(req: Request, res: Response): void {
    console.log(req.body);
    if (!Object.keys(req.body).length) {
      res.statusCode = 400;
      res.json({
        message: "Found empty payload in the request"
      });
    }
    /**
     * Faking the DB operation by manually adding the id
     * and adding the new Course inside the original array
     */
    this.currentId = this.currentId + 1;
    const requestBody = req.body;
    requestBody["id"] = this.currentId;
    COURSES[this.currentId] = requestBody;
    res.json(COURSES[this.currentId]);
  }
}

export default Object.freeze(new CoursesService());
