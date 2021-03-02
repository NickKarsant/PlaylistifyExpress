var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  email: { type: String, trim: true, unique: true, required: true },
  playlists:  Array
  // playlists:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(require("mongoose-beautiful-unique-validation"));

module.exports = mongoose.model("User", UserSchema);
