import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
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
});

export { router };
