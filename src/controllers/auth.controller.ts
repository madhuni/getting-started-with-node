import express, { Application, Router } from "express";

import { authservice } from "../services";

export class AuthController {
  private router: Router;

  constructor(private app: Application) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use("/api/auth", this.router);

    this.router.route("/login")
      .post(authservice.loginUser);

    this.router.route("/logout")
      .get(authservice.logoutUser);
  }
}
