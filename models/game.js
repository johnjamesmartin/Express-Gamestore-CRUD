/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const GameSchema = new Schema({
  title: { type: String, required: true },
  platform: { type: Schema.Types.ObjectId, ref: 'Platform', required: true },
  medium: { type: String, required: true },
  developer: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  genreInfo: { type: Object, ref: 'Genre' },
  releaseYear: { type: Number }
});

/* Virtuals:
 *****************************************/
GameSchema.virtual('url').get(() => '/catalog/game/' + this._id);

module.exports = mongoose.model('Game', GameSchema);
