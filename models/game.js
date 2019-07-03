/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const GameSchema = new Schema({
  title: { type: String, required: true },
  platform: { type: Schema.Types.ObjectId, ref: 'Platform', required: true },
  developer: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  releaseYear: { type: Number }
});

/* Virtuals:
 *****************************************/
GameSchema.virtual('url').get(function() {
  return '/catalog/game/' + this._id;
});

module.exports = mongoose.model('Game', GameSchema);
