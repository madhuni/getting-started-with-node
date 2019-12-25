const config = {
  username: '#########',
  password: '#########',
  dbName: 'test',
  hostName: 'cluster0-xkxpw.mongodb.net',
  options: 'retryWrites=true&w=majority'
}

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const remoteConnectionString = `mongodb+srv://${config.username}:${config.password}@${config.hostName}/${config.dbName}?${config.options}`;

const localConnectionString = `mongodb://127.0.0.1:27017/test-db?compressors=zlib&gssapiServiceName=mongodb`;

module.exports = {
  dbOptions,
  remoteConnectionString,
  localConnectionString
}