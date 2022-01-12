// importing

import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
// GtplqJwECjEwWUS7

// app config

const app = express();

const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1330346",
  key: "68347bddeb42bc38885b",
  secret: "a8fe8e717f2d5d8b42b5",
  cluster: "ap2",
  useTLS: true,
});

const connection_url =
  "mongodb+srv://admin:GtplqJwECjEwWUS7@cluster0.effmj.mongodb.net/whatsappdb?retryWrites=true&w=majority";

// middlewares

app.use(express.json());

// DB config

mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("line 26, connected to mongoDB");
  }
);

// ????

// api routes
app.get("/", (req, res) => res.status(200).send("helloworld"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// listen

app.listen(port, () => console.log(`listenting on local host: ${port}`));
