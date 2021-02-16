var mongoose = require("mongoose");

var SongSchema = new mongoose.Schema({
  name: { type: String, trim: true, index: true, unique: false, sparse: false },
  artist: {
    type: String,
    trim: true,
    index: true,
    unique: false,
    sparse: false
  },
  images: Array,
  liked: false
});

module.exports = mongoose.model("Song", SongSchema);
