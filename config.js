var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    cluster: process.env.DB_CLUSTER,
    params: process.env.DB_PARAMS
  }
};

//mongodb+srv://max:Thumper123_@cluster0-ziup4.mongodb.net/test?retryWrites=true&w=majority
