import express, { Application, Router } from "express";

import { usersService } from "../services";

export class UsersController {

  private router: Router;

  constructor(private app: Application) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use("/api/users", this.router);

    this.router.route("/")
      .get(usersService.getUsers.bind(usersService));

    this.router.route("/register")
      .post(
        usersService.userValidationRules(), usersService.registerUser.bind(usersService)
      );

    this.router.route("/:id")
      .get(usersService.getUser.bind(usersService))
      .put(usersService.updateUser.bind(usersService))
      .delete(usersService.deleteUser.bind(usersService));
  }
}
