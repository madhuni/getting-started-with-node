import { MongoClientOptions } from "mongodb";

export const dbOptions: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
