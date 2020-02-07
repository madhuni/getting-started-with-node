import mysql, { Connection, ConnectionConfig } from "mysql";

import { envConfig } from "./env.config";

const connectionConfig: ConnectionConfig = {
  host: envConfig.mySqlHostName,
  user: envConfig.mySqlUserName,
  password: envConfig.mySqlPassword,
  database: envConfig.mySqlDatabaseName
};

export const connection: Connection = mysql.createConnection(connectionConfig);
