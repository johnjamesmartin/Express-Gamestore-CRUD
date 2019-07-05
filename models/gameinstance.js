/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const GameInstanceSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  console: { type: String, required: true },
  manufacturer: { type: String, required: true },
  medium: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true }
});

/* Virtuals:
 *****************************************/
GameInstanceSchema.virtual('url').get(
  () => '/catalog/gameinstance/' + this._id
);

module.exports = mongoose.model('GameInstance', GameInstanceSchema);
