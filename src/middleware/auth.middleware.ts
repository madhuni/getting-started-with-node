import { NextFunction, Request, Response  } from "express";

/**
 * This middleware will make sure if the user is authenticated then
 * only all the routes using this middleware can be used.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized user access." });
}
