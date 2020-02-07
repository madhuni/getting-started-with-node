import { IEnvConfig } from "../interfaces/env.interface";

export const envConfig: IEnvConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT as string, 10) || 1400,
  hostName: process.env.HOST_NAME,
  mySqlHostName: process.env.MYSQL_HOST,
  mySqlUserName: process.env.MYSQL_USER,
  mySqlPassword: process.env.MYSQL_PASSWORD,
  mySqlDatabaseName: process.env.MYSQL_DATABASE,
  mySqlConnectionURL: process.env.MYSQL_CONNECTION_URL,
  sessionName: process.env.SESSION_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  cookieMaxAge: parseInt(process.env.COOKIE_MAX_AGE as string, 10) || 3600000
}
