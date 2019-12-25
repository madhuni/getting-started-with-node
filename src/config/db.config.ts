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

export const remoteConnectionString = `mongodb+srv://${config.username}:${config.password}@${config.hostName}/${config.dbName}?${config.options}`;

export const localConnectionString = `mongodb://127.0.0.1:27017/test-db?compressors=zlib&gssapiServiceName=mongodb`;
