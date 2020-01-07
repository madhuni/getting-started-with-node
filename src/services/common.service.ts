import { Request, Response } from "express";

import { EMAIL_REGEX_STRING } from "../config/constants";

class CommonService {
  public showWelcomeMessage(req: Request, res: Response): void {
    res.send(`
      <html>
        <head>
          <link href="assets/styles.css" type="text/css" rel="stylesheet"/>
        </head>
        <body>
          <h1>Hello EXPRESS World!</h1>
        </body>
      </html>
    `);
  }

  public getFavicon(req: Request, res: Response): void {
    res.send("assets/favicon.ico");
  }

  /**
   * This function will check for the validity of a Email string
   * if that's a valid email or not. This will check agains the below rules:
   * - Uppercase (A-Z) and lowercase (a-z) English letters.
   * - Digits (0-9).
   * - Characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~
   * - Character . ( period, dot or fullstop) provided that it is not the
   *   first or last character and it will not come one after the other.
   *
   * @param {string} email
   * @returns {boolean}
   * @memberof CommonService
   */
  public checkEmailValidity(email: string): boolean {
    if (EMAIL_REGEX_STRING.test(email)) {
      return true;
    }
    throw new Error("Email is not valid.");
  }
}

export default Object.freeze(new CommonService());
