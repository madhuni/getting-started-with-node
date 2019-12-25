import express, { Request, Response } from "express";

import { LESSONS } from "../data/data";

const router = express.Router();

router.get("/", (req: Request, res: Response, next) => {
  const data = {
    payload: Object.values(LESSONS)
  };
  res.status(200).json(data);
});

router.get("/:id", (req: Request, res: Response, next) => {
  const lessonId = req.params.id;
  if (LESSONS[lessonId] !== undefined) {
    res.json(LESSONS[lessonId]);
  } else {
    res.send(404).send("Course Not Found.");
  }
});

export { router };
