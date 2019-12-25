import express, { Request, Response } from "express";

import { COURSES } from "../data/data";

const router = express.Router();

let currentId = 4;

router.get("/", (req: Request, res: Response, next) => {
  const data = {
    payload: Object.values(COURSES)
  };
  res.status(200).json(data);
});

router.get("/:id", (req: Request, res: Response, next) => {
  const courseId = req.params.id;
  if (COURSES[courseId] !== undefined) {
    res.json(COURSES[courseId]);
  } else {
    res.status(400).json({message: "Course not found"});
  }
});

router.post("/", (req: Request, res: Response, next) => {
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
  currentId = currentId + 1;
  const requestBody = req.body;
  requestBody["id"] = currentId;
  COURSES[currentId] = requestBody;
  res.json(COURSES[currentId]);
});

export { router };
