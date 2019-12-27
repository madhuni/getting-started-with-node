import express, { Application, Router } from "express";

import { usersService } from "../services";

export class UsersController {

  private router: Router;

  constructor(private app: Application) {
    this.router = express.Router();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/users", this.router);

    /**
     * Same Routes can be chained together
     */
    this.router.route("/")
      .get(usersService.getUser)
      .post(usersService.addUser);

    this.router.route("/:id")
      .get(usersService.getUser)
      .put(usersService.updateUser)
      .delete(usersService.deleteUser);
  }
}
