import { Request, Response } from "express";

import { LESSONS } from "../data/data";

export class LessonsService {

  public getLessons(req: Request, res: Response): void {
    const data = {
      payload: Object.values(LESSONS)
    };
    res.status(200).json(data);
  }

  public getLesson(req: Request, res: Response): void {
    const lessonId = req.params.id;
    if (LESSONS[lessonId] !== undefined) {
      res.json(LESSONS[lessonId]);
    } else {
      res.send(404).send("Course Not Found.");
    }
  }
}
