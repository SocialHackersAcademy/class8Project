
let express = require("express");
let app = express();

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware


app.use(require("./routes/post-routes"));

// setting up the database

mongoose.connect(
  "mongodb://localhost/class_8_final",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to mongo db")
);

// PORT
app.listen(process.env.PORT || 4000, () => {
  console.log("Connected to port ");
});
