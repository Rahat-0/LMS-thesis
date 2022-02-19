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
app.use(cors());
app.use(express.static("public"));

const port = process.env.PORT || 2000;

//router define here
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: 'welcome to node server',
  });
});

app.listen(port, (err) => {
  console.log(`server running at ${port}`);
  mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URL_LOCAL, (err) => {
    console.log("db connected");
   
  });
});
