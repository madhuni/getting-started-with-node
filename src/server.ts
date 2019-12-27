import chalk from "chalk";
import figlet from "figlet";

import app from "./app";
import { HOST_NAME, PORT } from "./config/server.config";

app.listen(PORT, HOST_NAME, () => {
  figlet("Welcome To Node Server", (err: any, data: any) => {
    if (err) {
      console.log("Something is wrong with Figlet.");
      return;
    }
    console.log(data);
  });
  console.log(chalk.green(`Server is up and running at http://${HOST_NAME}:${PORT}`));
});
