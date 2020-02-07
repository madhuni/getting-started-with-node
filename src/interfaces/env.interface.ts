export interface IEnvConfig {
  nodeEnv?: string;
  port?: number;
  hostName?: string;
  mySqlHostName?: string;
  mySqlUserName?: string;
  mySqlPassword?: string;
  mySqlDatabaseName?: string;
  mySqlConnectionURL?: string;
  sessionName?: string;
  sessionSecret?: string;
  cookieMaxAge?: number;
}
