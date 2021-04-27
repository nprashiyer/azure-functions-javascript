const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

/* use the Cosmos DB connection string you copied ealier and replace in the `url` variable */
const url = "mongodb://testutil001:ZlRK0WnYoaYd4euA5DnAwRuBWtTBhdXPMcbI2KKHIkdxqVqtOEszm38wmX6cnfGJodzEZ32UhKtTH8PXfec1Sw==@testutil001.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@testutil001@";
const client = new MongoClient(url);

module.exports = async function (context, req) {
  context.log("Conneting to database")
  await client.connect();
  const database = client.db("utilapp");
  const collection = database.collection("tasks");
  let list = await collection.find({}).toArray();
  return context.res = {
    status: 200,
    body: list,
  };
};