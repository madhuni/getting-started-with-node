import mysql, { Connection, ConnectionConfig } from "mysql";

const connectionConfig: ConnectionConfig = {
  host: "localhost",
  user: "*****",
  password: "*****",
  database: "node_app"
};

export const connection: Connection = mysql.createConnection(connectionConfig);
