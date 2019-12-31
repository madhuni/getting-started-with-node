import { Request, Response } from "express";

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
}

export default Object.freeze(new CommonService());
