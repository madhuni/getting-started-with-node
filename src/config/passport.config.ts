import bcrypt from "bcrypt";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "../models/user.model";

export function setupPassportStrategy(passport: PassportStatic) {
  passport.use(new LocalStrategy((username: string, password: string, done: CallableFunction) => {
    const query = {userName: username};
    User.findOne(query)
      .then((user: any) => {
        if (!user) {
          return done(null, false, { status : 404 });
        }

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
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }));

  passport.serializeUser((user: any, done: CallableFunction) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: CallableFunction) => {
    User.findById(id, (err: Error, user: any) => {
      done(err, user);
    });
  });
}
