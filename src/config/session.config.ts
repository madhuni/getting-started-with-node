import { SessionOptions } from "express-session";

enum SessionConstants {
  SESSION_NAME = "_sid", // name of the session being created
  SESSION_SECRET = "some little secret"
}

export const options: SessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
    path: "/",
    sameSite: false,
    secure: false
  },
  name: SessionConstants.SESSION_NAME,
  secret: SessionConstants.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  genid: (req) => {
    return Math.random() + "";
  }
};
