const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
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

module.exports = router;