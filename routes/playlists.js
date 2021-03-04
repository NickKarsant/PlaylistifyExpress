const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Playlist = require("../models/playlist");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware.js");
const mongoose = require("mongoose");


// show users Home page, all playlists
router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const user = await User.find({
      "_id": req.user._id
    });


    const userObject = user[0];

    const usersPlaylists = userObject.playlists

    console.log(userObject);

    res.render("playlists/index", { usersPlaylists });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  console.log(req.body)
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

    // playlist created
    console.log(savedPlaylist);
    const foundUsers = await User.find({
      "_id": req.user._id
    });
    // console.log(user)
    // console.log(user[0].playlists)
    // update mongodb
    const desiredUser = foundUsers[0];
    desiredUser.playlists.push(savedPlaylist);

    await desiredUser.save()
    console.log(desiredUser);







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
