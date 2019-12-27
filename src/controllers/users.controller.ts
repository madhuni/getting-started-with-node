import express, { Application, Router } from "express";

import { UsersService } from "../services";

export class UsersController {

  private router: Router;
  private _usersSvc: UsersService;

  constructor(private app: Application) {
    this.router = express.Router();
    this._usersSvc = new UsersService();
    this.setupRoutes();
  }

  public setupRoutes(): void {
    this.app.use("/api/users", this.router);

    /**
     * Same Routes can be chained together
     */
    this.router.route("/")
      .get(this._usersSvc.getUsers)
      .post(this._usersSvc.addUser);

    this.router.route("/:id")
      .get(this._usersSvc.getUser)
      .put(this._usersSvc.updateUser)
      .delete(this._usersSvc.deleteUser);
  }
}
