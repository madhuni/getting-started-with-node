import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";

import { User } from "../models/user.model";

export class UsersService {

  public getUsers(req: Request, res: Response): void {
    User.find({}, (err: Error, users: MongooseDocument) => {
      if (err) {
        res.status(400).json({
          message: err.message
        });
      }
      res.status(200).json({
        data: users
      });
    });
  }

  public getUser(req: Request, res: Response): void {
    const _id = req.params.id;
    User.findOne({ _id }, (err: Error, user: MongooseDocument) => {
      if (err) {
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.status(400).json({ message: err.message });
        }
      }
      res.status(200).json(user);
    });
  }

  public addUser(req: Request, res: Response): void {
    const user: any = new User(req.body);
    user.save((err: Error, user: MongooseDocument) => {
      if (err) {
        res.status(400).json({
          message: err.message
        });
      }
      res.status(200).json(user);
    });
  }

  public updateUser(req: Request, res: Response): void {
    const _id = req.params.id;

    User.findOneAndUpdate({ _id }, req.body, { new: true }, (err: Error, user: any) => {
      if (err) {
        if (!user) {
          res.status(404).json({ message: "User not found!" });
        } else {
          res.status(400).json({ message: err.message });
        }
      }

      res.status(200).json(user);
    });
  }

  public deleteUser(req: Request, res: Response): void {
    const _id = req.params.id;
    User.findOneAndRemove({ _id }, (err: Error, user: any) => {
      if (err) {
        if (!user) {
          res.status(404).json({ message: "User doesn't exists."});
        } else {
          res.status(400).json({ message: err.message });
        }
      }
      res.status(200).json({ message: `User is deleted.` });
    });
  }
}
