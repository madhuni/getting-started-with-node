import bcrypt from "bcrypt";
import chalk from "chalk";
import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { MongooseDocument } from "mongoose";

import { User } from "../models/user.model";

import { commonService } from "./index";

class UsersService {
  // Private helper methods go here

  /**
   * This method will check if the `password` and the `confirmPassword` are
   * matching or not.
   *
   * @private
   * @param {string} password
   * @param {string} confirmPassword
   * @returns {boolean}
   */
  private checkConfirmPassword(password: string, confirmPassword: string): boolean {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  }

  /**
   * This method will create a `HASH` for a given `password` string.
   *
   * @private
   * @param {string} password
   * @returns {Promise<string>}
   */
  private generatePasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * This method will check if the `email` of the `User` being registerd is already
   * been registered or not.
   *
   * @private
   * @param {string} email
   * @returns {Promise<MongooseDocument>}
   */
  private checkIfEmailAlreadyExists(email: string): Promise<MongooseDocument> {
    return new Promise((resolve, reject) => {
      User.findOne({email}, (err: Error, user: MongooseDocument) => {
        if (err) {
          reject("Error occured while finding the user in db");
        } else {
          resolve(user);
        }
      });
    });
  }

  /**
   * This method will check if the `userName` of the `User` being registerd is already
   * exist or not.
   *
   * @private
   * @param {string} userName
   * @returns {Promise<MongooseDocument>}
   */
  private checkIfUsernameAlreadyExists(userName: string): Promise<MongooseDocument> {
    return new Promise((resolve, reject) => {
      User.findOne({userName}, (err: Error, user: MongooseDocument) => {
        if (err) {
          reject("Error occured while finding the user in db");
        } else {
          resolve(user);
        }
      });
    });
  }

  /**
   * This method will return the validation rules chain
   *
   * @returns {ValidationChain[]}
   */
  public userValidationRules(): ValidationChain[] {
    return [
      body("firstName")
        .notEmpty().withMessage("First name is required")
        .isLength({min: 4}).withMessage("First name must have a minimum of 4 characters"),
      body("lastName", "Last name is required").notEmpty(),
      body("email")
        .notEmpty().withMessage("Email is required")
        .custom(commonService.checkEmailValidity).withMessage("Email is not valid"),
      body("userName", "Username is required").notEmpty(),
      body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 8}).withMessage("Password should contain atleast 8 chars"),
      body("confirmPassword", "Confirm password is required").notEmpty()
    ];
  }

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

  /**
   * This method will be called when the POST request for user registration
   * will be done
   *
   * @param {Request} req
   * @param {Response} res
   */
  public registerUser(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(400).json(errors);
    } else {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const userName = req.body.userName;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      // check if both the passwords are matching
      if (this.checkConfirmPassword(password, confirmPassword)) {
        // check if user is already exists with the same email
        this.checkIfEmailAlreadyExists(email)
          .then((user: MongooseDocument) => {
            if (!user) {
              return this.checkIfUsernameAlreadyExists(userName);
            } else {
              res.status(400).json({
                message: "Email already registered!"
              });
              return Promise.reject("Email was already registered. Hence terminating the request.");
            }
          })
          .then((user: MongooseDocument) => {
            if (!user) {
              return this.generatePasswordHash(password);
            } else {
              res.status(400).json({
                message: "Username already exists. Try another username."
              });
              return Promise.reject("Username was already existing. Hence terminating the request.");
            }
          })
          .then((hash: string) => {
            const newUser = new User({
              firstName,
              lastName,
              email,
              userName,
              password: hash
            });
            return newUser.save();
          })
          .then((user: MongooseDocument) => {
            res.status(200).json(user);
          })
          .catch((err) => {
            console.log(chalk.red(err));
            res.status(500).send();
          });
      } else {
        res.status(400).json({
          message: "Passwords do not match"
        });
      }
    }
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

/**
 * Exporting the Service as SINGLETON service
 *
 * We are using `Object.freeze()` method for the new instance created
 * so that the methods of the `UsersService` can not be overriden from the
 * consuming code.
 */
export default Object.freeze(new UsersService());
