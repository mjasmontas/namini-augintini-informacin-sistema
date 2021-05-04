require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dbRole = require("./models");
const Role = dbRole.role;
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
  .then(() => {console.log("MongoDB Connected");
    initial()})
  .catch(err => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/pet.routes')(app);
require('./routes/reservation.routes')(app);
require('./routes/veterinarianVisit.routes')(app);
require('./routes/petTrainer.routes')(app);
require('./routes/message.routes')(app);


if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(PORT, function () {
  console.log("App listening on Port: " + PORT);
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        roleName: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        roleName: "petTrainer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        roleName: "veterinarian"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'veterinarian' to roles collection");
      });

      new Role({
        roleName: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
