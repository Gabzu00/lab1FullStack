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
      return albums;
    })
    .catch(error => {
      throw new Error("Could not fetch the documents: " + error);
    });
}

function addData(_id, title, artistName, year) {
  return dbConnection
    .collection("Albums")
    .insertOne({ _id, title, artistName, year })
    .then(result => {
      console.log(result.insertedCount + " document(s) inserted");
      return result;
    })
    .catch(error => {
      return ("The id you entered already exist in the database")
      /*  throw new Error("Could not insert the document: " + error); */
    });
}

function updateData(_id, title, artistName, year) {
  console.log(_id)
  return dbConnection
    .collection("Albums")
    .updateOne(
      { _id },
      { $set: { title, artistName, year } }
    )
    .then(result => {
      if (result.modifiedCount === 1) {
        console.log("Document updated successfully");
        return result;
      } else {
        return "Error ! This id was not found in the database"
      }

    })
    .catch(error => {
      console.log("Could not update the document:", error);
      throw error;
    });
}



module.exports = {
  updateData,
  addData,
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