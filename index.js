const express = require("express")
const app = express()
require("dotenv").config()
const path = require('path');
const { connectToDB, getDB, getData, getDataTitle, addData, updateData } = require("./db");
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
      if (albums === undefined || albums.length == 0) {
        res.send(JSON.stringify("title not found")).status(404)
      } else {
        res.json(albums)
      }

    })
    .catch(error => {
      res.json(error)
    });

})


app.post('/api/albums', (req, res) => {
  let id = req.body.id
  let title = req.body.title
  let artist = req.body.artist
  let year = req.body.year

  addData(id, title, artist, year)
    .then(albums => {
      console.log(albums)
      res.json(albums).status(201)
    })
    .catch(error => {
      res.json(error).status(409)
    });
})


app.put('/api/albums/:id', (req, res) => {
  let id = req.params.id
  let title = req.body.title
  let artist = req.body.artist
  let year = req.body.year

  updateData(id, title, artist, year)
    .then(albums => {
      console.log(albums)
      res.json(albums).status(201)
    })
    .catch(error => {
      res.json(error).status(404)
    });

})
