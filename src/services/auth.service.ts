import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

class AuthService {

  /**
   * Callback method for User login.
   *
   * Since we are using the custom callback for Authentication, hence
   * manuallly handling the session by calling the `req.login` method.
   *
   * Doing this will make sure to send the session cookie in the response
   * header and takes care of Serializing and De-serialzing the user.
   */
  public loginUser(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", { session: true }, (err, user, info: { status: number; }) => {
      switch (info.status) {
        case 200:
          req.login(user, () => {
            console.log(chalk.green(`A session is created manually.`));
          });
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

  /**
   * Callback method for user logout
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @memberof AuthService
   */
  public logoutUser(req: Request, res: Response, next: NextFunction): void {
    req.logout();
    res.status(200).json({
      message: "User is logged out successfully."
    });
  }
}

export default Object.freeze(new AuthService());
