import { NextFunction, Request, Response } from "express";
import passport from "passport";

class AuthService {

  public loginUser(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err, user, info: { status: number; }) => {
      switch (info.status) {
        case 200:
          res.status(200).json({
            message: `${user.firstName} ${user.lastName} logged in successfully!`
          });
          break;
        case 404:
          res.status(404).json({
            message: "Username not found."
          });
          break;
        case 400:
          res.status(400).json({
            message: `Incorrect password for ${user.userName}`
          });
          break;
        case 500:
          res.status(500).json({
            message: "Internal Server Error."
          });
          break;
        default:
          res.status(400).json(info);
          break;
      }
    })(req, res, next);
  }

  public logoutUser(req: Request, res: Response, next: NextFunction): void {
    req.logout();
    res.status(200).json({
      message: "User is logged out successfully."
    });
  }
}

export default Object.freeze(new AuthService());
