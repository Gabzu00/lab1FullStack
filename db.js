const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbConnection;

function getData() {
  return dbConnection
    .collection("Albums")
    .find()
    .toArray()
    .then(albums => {
      return albums;
    })
    .catch(error => {
      throw new Error("Could not fetch the documents: " + error);
    });
}

function getDataTitle(title) {
  console.log(title)
  return dbConnection
    .collection("Albums")
    .find({ title: { $eq: title } })
    .toArray()
    .then(albums => {
      console.log(albums + " array from db")
      return JSON.stringify(albums);
    })
    .catch(error => {
      throw new Error("Could not fetch the documents: " + error);
    });
}

module.exports = {
  getData,
  getDataTitle,
  connectToDB: async () => {
    try {
      const client = await MongoClient.connect(process.env.URL);
      dbConnection = client.db();
      console.log("Connected!!");
    } catch (error) {
      console.log(error);
      throw new Error("Could not connect to database: " + error);
    }
  },
  getDB: () => dbConnection,
};