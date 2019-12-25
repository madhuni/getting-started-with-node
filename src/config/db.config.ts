export const config = {
  username: "madhuni",
  password: "m@dhuni22",
  dbName: "test",
  hostName: "cluster0-xkxpw.mongodb.net",
  options: "retryWrites=true&w=majority"
};

export const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export const connectionString = `mongodb+srv://${config.username}:${config.password}@${config.hostName}/${config.dbName}?${config.options}`;
