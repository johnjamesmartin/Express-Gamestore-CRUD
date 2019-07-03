/* Dependencies
 *****************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Schema
 *****************************************/
const PlatformSchema = new Schema({
  consoleName: { type: String, required: true, max: 100 },
  manufacturerName: { type: String, required: true, max: 100 },
  medium: { type: String, required: true, max: 100 }
});

/* Virtuals:
 *****************************************/
PlatformSchema.virtual('platformInfo').get(function() {
  return `This game is a ${
    this.medium
  } made for ${this.manufacturerName}'s "${this.consoleName}"`;
});

PlatformSchema.virtual('url').get(function() {
  return '/catalog/platform/' + this._id;
});

module.exports = mongoose.model('Platform', PlatformSchema);
