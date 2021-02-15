var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, trim: true, index: true, unique: true, sparse: false},
  password: String,
  playlists: Array
});

UserSchema.plugin(require('mongoose-beautiful-unique-validation'));
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);