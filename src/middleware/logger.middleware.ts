import { NextFunction, Request, Response } from "express";
import { appendFile } from "fs";

export function logIncomingRequestDetails(req: Request, res: Response, next: NextFunction): void {
  const fileDir = __dirname + "/../../logger.txt";
  const startLog = `incoming-request: ${new Date()}: ${req.method} ${req.originalUrl}\n`;
  const start = new Date().getTime();
  appendFile(fileDir, startLog, (err) => {
    if (err) {
      throw err;
    }
    console.log("Logged the request into the file!");
  });

  res.on("finish", () => {
    const elapsed = new Date().getTime() - start;
    const endLog = `request-end: ${new Date()}: ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms\n`;
    appendFile(fileDir, endLog, (err) => {
      if (err) {
        throw err;
      }
      console.log("Logged the response end details!");
    });
  });
  next();
}
