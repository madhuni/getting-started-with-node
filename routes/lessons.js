const express = require('express');
const { LESSONS } = require('../data/data');
const router = express.Router();

router.get('/', function(req, res, next) {
  const data = {
    payload: Object.values(LESSONS)
  };
  res.status(200).json(data);
});

router.get('/:id', function(req, res, next) {
  const lessonId = req.params.id;
  if (LESSONS[lessonId] !== undefined) {
    res.json(LESSONS[lessonId]);
  } else {
    res.send(404).send('Course Not Found.');
  }
});

module.exports = router;