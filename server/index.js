// this is the index for the express server
require("dotenv").config();
const express = require("express"); // 1 of 2 for express server
const app = express(); // 2 of 2 for express server
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const path = require("path");
const axios = require("axios");


// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file-serving middleware / only needed for deployment
// app.use(express.static(path.join(__dirname, "..", "client/dist")));

// Check requests for a token and attach the decoded id to the request
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.JWT);
  } catch {
    req.user = null;
  }

  next();
});

// Backend routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
app.use((req, res) => {
  res.status(404).send("Not found.");
});


const port = process.env.PORT;


app.listen(port, function(err) {
  if (err) console.log("Error in server setup")
  console.log(`Listening on port ${port}...`);
});