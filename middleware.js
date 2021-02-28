// const { playlistSchema } = require('./schema.js');
// const ExpressError = require('./utils/ExpressError');
// const Playlist = require('./models/playlist');
// const Song = require('./models/song');


module.exports.isLoggedIn = (req,res,next) => {
  if (!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl;
    req.flash('error', "You must be signed in first");
    return res.redirect('/login');
  }
  next();
}