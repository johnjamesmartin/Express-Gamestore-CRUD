/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const GenreSchema = new Schema({
  name: { type: String, required: true, max: 100 }
});

/* Virtuals:
 *****************************************/
GenreSchema.virtual('genreInfo').get(function() {
  return `This game falls under the "${this.medium}" genre`;
});

GenreSchema.virtual('url').get(function() {
  return '/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);
