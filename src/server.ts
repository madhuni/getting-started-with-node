import chalk from "chalk";
import figlet from "figlet";

import app from "./app";
import { ServerConfig } from "./config/server.config";

app.listen(ServerConfig.PORT, ServerConfig.HOST_NAME, () => {
  figlet("Welcome To Node Server", (err: any, data: any) => {
    if (err) {
      console.log("Something is wrong with Figlet.");
      return;
    }
    console.log(data);
  });
  console.log(chalk.green(`Server is up and running at http://${ServerConfig.HOST_NAME}:${ServerConfig.PORT}`));
});
