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

const connectionString = `mongodb+srv://${config.username}:${config.password}@${config.hostName}/${config.dbName}?${config.options}`;

module.exports = {
  config,
  dbOptions,
  connectionString
}