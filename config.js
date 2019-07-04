/* Set up dotenv & export env variables
 *****************************************/
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    cluster: process.env.DB_CLUSTER,
    params: process.env.DB_PARAMS
  }
};
