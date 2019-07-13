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
  },
  passport: {
    secret: process.env.PASSPORT_SECRET
  },
  user: {
    super: {
      id: process.env.SUPER_ID,
      email: process.env.SUPER_EMAIL,
      username: process.env.SUPER_USERNAME,
      password: process.env.SUPER_PASSWORD
    },
    basic: {
      email: process.env.BASIC_EMAIL,
      username: process.env.BASIC_USERNAME,
      password: process.env.BASIC_PASSWORD
    }
  }
};
