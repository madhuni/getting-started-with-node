"use strict";

import express, { Request, Response } from "express";

// const express = require("express");
// const mongoose = require("mongoose");

import { User } from "../models/User";

// const User = require("../models/User");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).json({
        message: err.message
      });
    }
    res.status(200).json({
      data: users
    });
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const _id = req.params.id;
  User.findOne({ _id }, (err, user) => {
    if (err) {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(200).json(user);
  });
});

router.post("/", (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(400).json({
        message: err.message
      });
    }
    res.status(200).json(user);
  });
});

router.put("/:id", (req: Request, res: Response) => {
  const _id = req.params.id;

  User.findOneAndUpdate({ _id }, req.body, { new: true }, (err, user) => {
    if (err) {
      if (!user) {
        res.status(404).json({ message: "User not found!" });
      } else {
        res.status(400).json({ message: err.message });
      }
    }

    res.status(200).json(user);
  });
});

router.delete("/:id", (req: Request, res: Response) => {
  const _id = req.params.id;
  User.findOneAndRemove({ _id }, (err, user) => {
    if (err) {
      if (!user) {
        res.status(404).json({ message: "User doesn't exists."});
      } else {
        res.status(400).json({ message: err.message });
      }
    }
    res.status(200).json({ message: `User is deleted.` });
  });
});

export { router };
// module.exports = router;
