// this is the index for the express server
require('dotenv').config();
const app = require('./app');



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});