const express = require("express");
const mongodb = require("mongodb");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Post = require("./models/post");

const port = 3000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

// Connect to mongodb
const uri =
  "mongodb+srv://kanalt2700:Password1234@cluster00.rndca8d.mongodb.net/lavidadb";

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
    console.log("Mongo DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/add-post", async (req, res) => {
  const post = new Post({
    caption: req.body.caption,
    location: req.body.location,
  });

  post
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(err.status);
      res.send(err.message);
      console.log(err?.message);
    });

  // res.send(req.body);
});

// 8xPbOaTJQCU7llz7
