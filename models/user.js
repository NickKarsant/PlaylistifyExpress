var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  email: { type: String, trim: true, unique: true, required: true },
  playlists: Array
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(require("mongoose-beautiful-unique-validation"));

module.exports = mongoose.model("User", UserSchema);
