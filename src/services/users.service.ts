import bcrypt from "bcrypt";
import chalk from "chalk";
import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { MysqlError } from "mysql";

import { connection as MySQL } from "../config/mysql.config";
import { IResultPacket } from "../interfaces/mysql.interface";
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
   * @returns {Promise<User[]>}
   */
  private checkIfEmailAlreadyExists(email: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM users WHERE email = ${MySQL.escape(email)}`;
      MySQL.query(sqlQuery, (err: MysqlError | null, results?: User[]) => {
        if (err) {
          reject("Error occured while finding the user in db");
        } else {
          resolve(results);
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
   * @returns {Promise<User[]>}
   */
  private checkIfUsernameAlreadyExists(userName: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT * FROM users WHERE userName = ${MySQL.escape(userName)}`;
      MySQL.query(sqlQuery, (err: MysqlError | null, results?: User[]) => {
        if (err) {
          reject("Error occured while finding the user in db");
        } else {
          resolve(results);
        }
      });
    });
  }

  /**
   * Provided the `newUser` to be created, this method will create a new user in DB.
   *
   * @private
   * @param {User} newUser
   * @returns {Promise<User>}
   * @memberof UsersService
   */
  private createNewUser(newUser: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const sqlQuery = `INSERT INTO users set ${MySQL.escape(newUser)}`;
      MySQL.query(sqlQuery, (err: MysqlError | null, results: IResultPacket) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          const createdUser: User = {...newUser, id: results.insertId};
          delete createdUser.password;
          resolve(createdUser);
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
    const sqlQuery = `SELECT id, firstName, lastName, email, userName FROM users`;
    MySQL.query(sqlQuery, (err: MysqlError, results: User[]) => {
      if (err) {
        res.status(400).json({
          message: err.message
        });
        return;
      }
      res.status(200).json({
        data: results
      });
    });
  }

  public getUser(req: Request, res: Response): void {
    const _id = req.params.id;
    const sqlQuery = `
      SELECT id, firstName, lastName, email, userName
      FROM users
      WHERE id = ${MySQL.escape(_id)}
    `;
    MySQL.query(sqlQuery, (err: MysqlError, results: User[]) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      if (!results.length) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(results[0]);
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
      const { firstName, lastName, email, userName, password, confirmPassword } = req.body;
      // check if both the passwords are matching
      if (this.checkConfirmPassword(password, confirmPassword)) {
        // check if user is already exists with the same email
        this.checkIfEmailAlreadyExists(email)
          .then((users: User[]) => {
            if (!users.length) {
              return this.checkIfUsernameAlreadyExists(userName);
            } else {
              res.status(400).json({
                message: "Email already registered!"
              });
              return Promise.reject("Email was already registered. Hence terminating the request.");
            }
          })
          .then((user: User[]) => {
            if (!user.length) {
              return this.generatePasswordHash(password);
            } else {
              res.status(400).json({
                message: "Username already exists. Try another username."
              });
              return Promise.reject("Username was already existing. Hence terminating the request.");
            }
          })
          .then((hash: string) => {
            const newUser: User = {
              id: -1,
              firstName,
              lastName,
              email,
              userName,
              password: hash
            };
            delete newUser.id;
            return this.createNewUser(newUser);
          })
          .then((newUser: User) => {
            res.status(200).json(newUser);
          })
          .catch((err) => {
            console.log(chalk.red(err));
            res.status(500).json({ message: "Internal Server Error" });
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
    const sqlQuery = `
      UPDATE users
      SET ${MySQL.escape(req.body)}
      WHERE id = ${MySQL.escape(_id)}
    `;
    MySQL.query(sqlQuery, (err: MysqlError, results: IResultPacket) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "User not found!" });
        return;
      }
      res.status(200).json({ message: "Details are updated." });
    });
  }

  public deleteUser(req: Request, res: Response): void {
    const _id = req.params.id;
    const sqlQuery = `DELETE FROM users WHERE id = ${MySQL.escape(_id)}`;
    MySQL.query(sqlQuery, (err: MysqlError, results: IResultPacket) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "User doesn't exists."});
        return;
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
