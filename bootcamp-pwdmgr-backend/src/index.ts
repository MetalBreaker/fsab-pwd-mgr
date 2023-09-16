import express from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// ====================================================================
// Routes
// ====================================================================

type Password = {
  _id?: ObjectId;
  icon: string;
  name: string;
  username: string;
  password: string;
};

app.get("/passwords", async (_, res) => {
  try {
    const passwords = db.collection("passwords");
    const cursor = passwords.find().sort("name", 1);
    return res.json(await cursor.toArray());
  } catch {
    return res.status(500).send();
  }
});

app.post("/passwords", async (req, res) => {
  try {
    const passwords = db.collection("passwords");
    const body = req.body;
    const pwd: Password = {
      icon: body.icon,
      name: body.name,
      username: body.username,
      password: body.password
    };
    const inserted = await passwords.insertOne(pwd);
    pwd._id = inserted.insertedId;
    return res.json(pwd);
  } catch {
    return res.status(500).send();
  }
});

app.get("/passwords/:passwordID", async (req, res) => {
  try {
    const passwords = db.collection("passwords");
    const pwd = passwords.findOne({ '_id': new ObjectId(req.params.passwordID) });
    if (pwd !== null)
      return res.json(pwd);
    else
      return res.status(404).send();
  } catch {
    return res.status(500).send();
  }
});

app.patch("/passwords/:passwordID", async (req, res) => {
  try {
    const passwords = db.collection("passwords");
    const body = req.body;
    const pwd: Password = {
      icon: body.icon,
      name: body.name,
      username: body.username,
      password: body.password
    };
    await passwords.updateOne({ '_id': new ObjectId(req.params.passwordID) }, pwd);
    return res.json(pwd);
  } catch {
    return res.status(500).send();
  }
});

app.delete("/passwords/:passwordID", async (req, res) => {
  try {
    const passwords = db.collection("passwords");
    await passwords.deleteOne({ '_id': new ObjectId(req.params.passwordID) });
    res.send();
  } catch {
    return res.status(500).send();
  }
});

// Start the Express server.
function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();
