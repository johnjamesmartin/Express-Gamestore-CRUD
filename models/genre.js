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
GenreSchema.virtual('genreInfo').get(
  () => `This game is of the "${this.medium}" genre`
);

GenreSchema.virtual('url').get(() => '/catalog/genre/' + this._id);

module.exports = mongoose.model('Genre', GenreSchema);
