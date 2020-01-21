import bcrypt from "bcrypt";
import { MysqlError } from "mysql";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { connection as MySQL } from "../config/mysql.config";
import { User } from "../models/user.model";

export function setupPassportStrategy(passport: PassportStatic) {
  passport.use(new LocalStrategy((username: string, password: string, done: CallableFunction) => {
    const sqlQuery = `SELECT * FROM users WHERE username = ${MySQL.escape(username)}`;
    MySQL.query(sqlQuery, (err: MysqlError, results: User[]) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results.length) {
        return done(null, false, { status : 404 });
      }
      const user: User = results[0];
      // If user is found, then match password
      bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err, false, { status: 500 });
        }
        if (isMatch) {
          return done(null, user, { status: 200 });
        } else {
          return done(null, user, { status: 400 });
        }
      });
    });
  }));

  passport.serializeUser((user: any, done: CallableFunction) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: CallableFunction) => {
    const sqlQuery = `SELECT * FROM users WHERE id = ${MySQL.escape(id)}`;
    MySQL.query(sqlQuery, (err: MysqlError, results: User[]) => {
      done(err, results[0]);
    });
  });
}
