require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const dotnev = require('dotenv')
// const connectDB = require('./config/db')

// dotnev.config({path: './config/config.env'});

// connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// for file upload component
const cors = require("cors");
const formData = require("express-form-data");
const { CLIENT_ORIGIN } = require("./config");

app.use(cors({
  origin: CLIENT_ORIGIN
}));

app.use(formData.parse());

// Middleware for app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}


const MONGODB_URI = 'mongodb+srv://user:admin@saugykla.ncigi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, function () {
  console.log("App listening on Port: " + PORT);
});
