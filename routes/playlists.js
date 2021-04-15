const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Playlist = require("../models/playlist");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware.js");

// show users Home page, all playlists
router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const user = await User.find({
      _id: req.user._id
    });

    const userObject = user[0];

    var usersPlaylists = userObject.playlists;

    var userCreatedPlaylists = [];

    usersPlaylists.forEach(function(playlist) {
      if (playlist.name !== "Liked Songs") {
        userCreatedPlaylists.push(playlist);
      }
    });

    res.render("playlists/index", {
      usersPlaylists,
      userCreatedPlaylists,
      userObject
    });
  })
);

// new playlist page
router.get("/new", isLoggedIn, async (req, res) => {
  const user = await User.find({
    _id: req.user._id
  });

  const userObject = user[0];

  const usersPlaylists = userObject.playlists;
  res.render("playlists/new", { usersPlaylists });
});

// make new playlist
router.post(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const playlist = new Playlist(req.body);
    playlist.author = req.user._id;

    const savedPlaylist = await playlist.save();

    // playlist created
    // console.log(savedPlaylist);
    const foundUsers = await User.find({
      _id: req.user._id
    });
    // update mongodb
    const desiredUser = foundUsers[0];
    desiredUser.playlists.push(savedPlaylist);
    await desiredUser.save();

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
      return res.redirect("/playlists");
    }



    // const userObject = user[0];



    var usersPlaylists = [];
    var userCreatedPlaylists = [];
    if (typeof req.user === "undefined") {
      usersPlaylists;
    } else {
      const user = await User.find({
        _id: req.user._id
      });
      const userObject = user[0];
      usersPlaylists = userObject.playlists;
      usersPlaylists.forEach(function(playlist) {
        if (playlist.name !== "Liked Songs") {
          userCreatedPlaylists.push(playlist);
        }
      });

    }

    res.render("playlists/show", { playlist, usersPlaylists, userCreatedPlaylists });
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

// delete
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.find({
      _id: req.user._id
    });

    // var playlist = await Playlist.findById(id);

    // console.log(user);
    //     // array of objects
    //     var userPlaylists = user.playlists

    //     await User.updateOne(
    //       { "_id" : user._id} ,
    //       { "$pull" : { "playlists" : { "name" :  playlist.name } } } ,
    //       { "multi" : true }
    //   )

    await Playlist.findByIdAndDelete(id);

    req.flash("success", "Playlist deleted");

    res.redirect("/playlists");
  })
);

module.exports = router;
