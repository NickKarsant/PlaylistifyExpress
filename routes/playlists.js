const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Playlist = require("../models/playlist");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware.js");


// show users Home page, all playlists
router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const user = await User.find({
      "_id": req.user._id
    });

    console.log("user: " + user);
    const userObject = user[0];
    console.log("userObject: " + userObject)
    const usersPlaylists = userObject.playlists

    // USER IS AN ARRAY with an the user object inside.  WHY??
    console.log(userObject.playlists);
    // console.log("type of user.playlists: " + Array.isArray(usersPlaylists));
    // console.log("Users Playlists: " + user.playlists)

    res.render("playlists/index", { usersPlaylists });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("playlists/new");
});

// make new playlist
router.post(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const playlist = new Playlist(req.body);
    playlist.author = req.user._id;
    const savedPlaylist = await playlist.save();

    console.log("TYPE OF: " + typeof(savedPlaylist));
    console.log("POST ROUTE USER: " + req.user)
    
    req.user.playlists.push(savedPlaylist)
    console.log("POST ROUTE PLAYLISTS: " + req.user.playlists)

    req.flash("succes", "New playlist created!");
    res.redirect(`/playlists/${playlist._id}`);
  })
);

// individual playlist SHOW route
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id)
      .populate("song")
      .populate("author");
    if (!playlist) {
      req.flash("error", "Playlist not found");
      return res.redirect("/browse");
    }
    res.render("playlists/show", { playlist });
  })
);

// if click heart icon update "Liked Songs playlist" by adding song to playlists' song array
router.patch(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    console.log("hit patch route");
    // const song = await Song.findById(req.params.id)
    // const likedPlaylist = await Playlist.find({name: "Liked Songs"})

    res.render();
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Playlist.findByIdAndDelete(id);
    req.flash("success", "Playlist deleted");

    res.redirect("/browse");
  })
);

module.exports = router;
