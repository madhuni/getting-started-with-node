import {  NextFunction, Request, Response } from "express";

export class CommonService {
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

  public logIncomingRequestDetails(req: Request, res: Response, next: NextFunction): void {
    console.log({
      RequestUrl: req.url,
      RequestMethod: req.method,
      IsRequestSecure: req.secure,
      RequestIP: req.ip,
    });
    next();
  }
}
