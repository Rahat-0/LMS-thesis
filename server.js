const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const router = require("./routers/router");

const env = require("dotenv");
env.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 2000;
app.use(cors());

//router define here
app.use("/api", router);

app.get("/", (req, res) => {
  const datas = req.body;
  console.log(datas);
  res.json({
    message: datas,
  });
});

app.listen(port, (err) => {
  console.log(`server running at ${port}`);
  mongoose.connect(process.env.MONGO_URL, (err) => {
    console.log("db connected");
  });
});
