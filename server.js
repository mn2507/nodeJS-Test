const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const User = require("./app/routes/user.route");

var l = console.log.bind(console, "LOG:");
var w = console.warn.bind(console, "WARN:");
var e = console.error.bind(console, "ERROR:");

// initialize express app
const app = express();
//parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// routes
app.use("/user", User)

// connection to mongodb
let dev_db_url =
  "mongodb+srv://muthuNode:Muthu-2507@nodejs-cluster.0pwsl.mongodb.net/NodeTestDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", function (req, res) {
  res.json({
    message: "Welcome to NodeJS Test",
  });
});

let port = 8081;
app.listen(port, function () {
  l("Server is up and running on port number " + port);
});
