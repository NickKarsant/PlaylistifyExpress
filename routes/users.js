const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Playlist = require("../models/playlist");
const User = require("../models/user");
const passport = require("passport");

// Auth display login/regster
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

// auth
router.post(
  "/auth/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login"
  }),
  (req, res) => {
    if (req.session.returnTo) {
      res.redirect(req.session.returnTo);
      delete req.session.returnTo;
      return;
    }
    req.flash('success', "Welcome back!");
    res.redirect("/playlists");
  }
);


const createLikedSongsPlaylist = async (newUser) => {
  const LikedSongs = {
    name: "Liked Songs",
    username: newUser.username,
    image:
      "http://4.bp.blogspot.com/-OAFqpDO7Igg/Uns5RBhVroI/AAAAAAAAZpQ/K1Izf_yUWCI/s1600/Green+Heart+Wallpapers.jpg",
    songs: [],
    author: newUser.id
  };

  const playlist = new Playlist(LikedSongs);
  await playlist.save();

  // console.log("newUser.playlists BEFORE: " + newUser.playlists);
  // console.log("newUser.playlists BEFORE: " + Array.isArray(newUser.playlists));
  
  newUser.playlists.push(playlist);
  await newUser.save();
  // console.log("newUser.playlists AFTER: " + newUser.playlists);
  // console.log("newUser.playlists AFTER: " + Array.isArray(newUser.playlists));

}

router.post(
  "/auth/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username: username, email: email });

      const registeredUser = await User.register(newUser, password);
      

      createLikedSongsPlaylist(registeredUser);


      req.logIn(registeredUser, err => {
        console.log(registeredUser);
        if (err) {
          next();
        }
        req.flash("success", "Welcome to Playlist-ify, " + registeredUser.username + "!");
        res.redirect("/playlists");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  req.flash("success", "Bye! Come back soon");
  res.redirect("/browse");
});

module.exports = router;
