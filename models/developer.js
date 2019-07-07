/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const DeveloperSchema = new Schema({
  name: { type: String, required: true, max: 100 }
});

/* Virtuals:
 *****************************************/
DeveloperSchema.virtual('developerInfo').get(
  () => `This game is made by ${this.name}`
);

DeveloperSchema.virtual('url').get(() => '/catalog/developer/' + this._id);

module.exports = mongoose.model('Developer', DeveloperSchema);
