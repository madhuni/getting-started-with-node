const express = require('express');
const { COURSES } = require('../data/data');
const router = express.Router();

let currentId = 4;

router.get('/', function(req, res, next) {
  const data = {
    payload: Object.values(COURSES)
  };
  res.status(200).json(data);
});

router.get('/:id', function(req, res, next) {
  const courseId = req.params.id;
  if (COURSES[courseId] !== undefined) {
    res.json(COURSES[courseId]);
  } else {
    res.status(400).json({message: 'Course not found'});
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  if (!Object.keys(req.body).length) {
    res.statusCode = 400;
    res.json({
      message: 'Found empty payload in the request'
    });
  }
  /**
   * Faking the DB operation by manually adding the id
   * and adding the new Course inside the original array
  */
  currentId = currentId + 1;
  let requestBody = req.body;
  requestBody['id'] = currentId;
  COURSES[currentId] = requestBody;
  res.json(COURSES[currentId]);
});

module.exports = router;