/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const UserSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  accessLevel: { type: Number, required: true }
});

module.exports = mongoose.model('User', UserSchema);
