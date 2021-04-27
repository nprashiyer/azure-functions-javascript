const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const url = "mongodb://testutil001:ZlRK0WnYoaYd4euA5DnAwRuBWtTBhdXPMcbI2KKHIkdxqVqtOEszm38wmX6cnfGJodzEZ32UhKtTH8PXfec1Sw==@testutil001.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@testutil001@"
const client = new MongoClient(url);

let resetList = [
    {
        _id: uuidv4(),
        dateStamp: 20210427,
        hourSpent: 1,
        task: "Plan for next dat"         
    },
    {
        _id: uuidv4(),
        dateStamp: 20210427,
        hourSpent: 3,
        task: "Research Azure Fucntions"         
    },
    {
        _id: uuidv4(),
        dateStamp: 20210427,
        hourSpent: 0.5,
        task: "Publish article"         
    },
    {
        _id: uuidv4(),
        dateStamp: 20210427,
        hourSpent: 0.5,
        task: "Complete insurance formalities"         
    }
]
module.exports = async function (context, req) {
    context.log('Connecting to mongoDB');
    await client.connect();
    const database = client.db("utilapp");
    const collection = database.collection("tasks");
    context.log('Adding tasks to collection');
    await collection.insertMany(resetList);
    
    return (context.res = {
    status: 200,
    body: "Initialization successful",
  }); 
}