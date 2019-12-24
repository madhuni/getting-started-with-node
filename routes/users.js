'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');
const router = express.Router();

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.status(400).json({
        message: err.message
      })
    }
    res.status(200).json({
      data: users
    });
  });
});

router.get('/:id', function(req, res) {
  const _id = req.params.id;
  User.findOne({ _id }, function(err, user) {
    if (err) {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(200).json(user);
  });
});

router.post('/', function(req, res) {
  const user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      res.status(400).json({
        message: err.message
      });
    }
    res.status(200).json(user);
  });
});

router.put('/:id', function(req, res) {
  const _id = req.params.id;

  User.findOneAndUpdate({ _id }, req.body, { new: true }, function(err, user) {
    if (err) {
      if (!user) {
        res.status(404).json({ message: 'User not found!' });
      } else {
        res.status(400).json({ message: err.message });
      }
    }

    res.status(200).json(user);
  });
});

router.delete('/:id', function(req, res) {
  const _id = req.params.id;
  User.findOneAndRemove({ _id }, function(err, user) {
    if (err) {
      if (!user) {
        res.status(404).json({ message: 'User doesn\'t exists.'});
      } else {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(200).json({ message: `User is deleted.` });
  });
})

module.exports = router;