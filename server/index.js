// this is the index for the express server
require("dotenv").config();
const express = require("express"); // 1 of 2 for express server
const app = express(); // 2 of 2 for express server


const port = process.env.PORT;


app.listen(port, function(err) {
  if (err) console.log("Error in server setup")
  console.log(`Listening on port ${port}...`);
});