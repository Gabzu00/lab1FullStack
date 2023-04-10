const express = require("express")
const app = express()
require("dotenv").config()
const path = require('path');
const { connectToDB, getDB, getData, getDataTitle } = require("./db");
const cors = require("cors")

app.use(express.json())

app.use(cors({
  origin: "*"
}))

let db

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("app listening...")
    })
    db = getDB()
  })
  .catch(error => {
    console.log(error);
  });


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath)
})

app.get('/api/albums', (req, res) => {
  getData()
    .then(albums => {
      getData(albums);
      res.json(albums)
    })
    .catch(error => {
      console.log(error);
    });
})

app.get('/api/albums/:title', (req, res) => {
  const title = req.params.title;
  getDataTitle(title)
    .then(albums => {
      console.log(albums + " from server")
      getData(albums);
      res.json(albums)
    })
    .catch(error => {
      res.json(error)
    });

})

