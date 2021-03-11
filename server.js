const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const test = require("./app/routes/test.route");
const register = require("./app/routes/register.route")
const login = require("./app/routes/login.route")

// initialize express app
const app = express();
//parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/tests", test);
app.use("/register", register);
app.use("/login/session", login);

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
    status: true,
    message: "Welcome to NodeJS Test",
  });
});

let port = 8081;
app.listen(port, function () {
  console.log("Server is up and running on port number " + port);
});
