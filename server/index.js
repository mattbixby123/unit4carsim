// this is the index for the express server
require('dotenv').config();
const app = require('./app');



const port = process.env.PORT;
app.listen(port, function(err) {
  if (err) console.log("Error in server setup")
  console.log(`Listening on port ${port}...`);
});