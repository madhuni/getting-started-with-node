import chalk from "chalk";
import figlet from "figlet";

import app from "./app";
import { envConfig } from "./config/env.config";

const port = envConfig.port as number;
const hostName = envConfig.hostName as string;

app.listen(port, hostName, () => {
  figlet("Welcome To Node Server", (err: any, data: any) => {
    if (err) {
      console.log("Something is wrong with Figlet.");
      return;
    }
    console.log(data);
  });
  console.log(chalk.green(`Server is up and running at http://${hostName}:${port}`));
});
