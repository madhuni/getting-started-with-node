import { SessionOptions } from "express-session";

import { envConfig } from "./env.config";

export const options: SessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: envConfig.cookieMaxAge,
    path: "/",
    sameSite: false,
    secure: false
  },
  name: envConfig.sessionName,
  secret: envConfig.sessionSecret as string,
  resave: false,
  saveUninitialized: false,
  genid: (req) => {
    return Math.random() + "";
  }
};
