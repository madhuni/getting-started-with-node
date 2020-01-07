import { SessionOptions } from "express-session";

const SESSION_NAME = "_sid"; // name of the session being created
const COOKIE_LIFETIME = 10000; // 1s,
const SESSION_SECRET = "some little secret";

export const options: SessionOptions = {
  cookie: {
    httpOnly: true,
    maxAge: COOKIE_LIFETIME,
    path: "/",
    sameSite: false,
    secure: false
  },
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  genid: (req) => {
    return Math.random() + "";
  }
};
