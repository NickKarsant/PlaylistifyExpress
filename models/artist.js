var mongoose = require('mongoose');


var ArtistSchema = new mongoose.Schema({
  name: {type: String, trim: true, index: true, unique: false, sparse: false},  
  image: String,
  description: String,
  songs: []
});
ArtistSchema.plugin(require('mongoose-beautiful-unique-validation'));


module.exports = mongoose.model("Artist", ArtistSchema);