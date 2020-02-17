const express = require("express");
const app = express();

// Middleware

app.use(require("./Routes/post-routes"));


// PORT
app.listen(process.env.PORT || 4000, () => {
  console.log("Connected to port ");
});