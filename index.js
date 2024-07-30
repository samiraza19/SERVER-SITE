require("dotenv").config();
const cors = require("cors");

const { database_Connect } = require("./database/database_Connect");
const all_Routes = require("./routes/index");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Connected Successfully");
});

app.use(cors());

app.use(express.json());

database_Connect();

app.use(all_Routes);

app.listen(process.env.PORT, () => {
  console.log("server is runnung", process.env.PORT);
});
