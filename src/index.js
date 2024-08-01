const express = require("express");
const app = express();
const PORT = 3000;

require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.URI;
mongoose.connect(uri).then(() => {
  console.log("Connected to mongoose!");
});
const model = require("./model");

app.use(express.json());

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  if (id == "all") {
    const all = await model.find({});
    return res.status(200).send(all);
  } else {
    const entry = await model.findOne({
      id,
    });
    if (!entry) {
      return res.status(404).send({ msg: `No entry with id ${id} found!` });
    } else {
      return res.status(200).send(entry);
    }
  }
});

app.post("/api/users", async (req, res) => {
  const { body } = req;

  if (!body.balance || !body.id) {
    return res.status(400).send({
      msg: "Invalid request! You must specify the 'id' and 'balance'.",
    });
  } else {
    const has = await model.findOne({ id: body.id });
    if (has) {
      return res
        .status(400)
        .send({ msg: "There is already a document with id: " + body.id });
    } else {
      const newEntry = new model({
        id: body.id,
        balance: body.balance,
      });
      newEntry.save();
      const obj = {
        msg: "Created a new document with id: " + body.id,
        document: newEntry,
      };
      return res.status(201).send(obj);
    }
  }
});

app.listen(PORT);
