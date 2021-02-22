const express = require('express')
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
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
    failureRedirect: "/login",
  }),
  (req, res) => {
    // req.flash('success', "Welcome back!");
    if (req.session.returnTo) {
      res.redirect(req.session.returnTo)
      delete req.session.returnTo
      return
    }
    res.redirect('/playlists')
  }
);

router.post(
  "/auth/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username: username, email: email, });

      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      // making Liked Songs playist should happene here
      


      req.logIn(registeredUser, err => {
        if (err){
          next()
        }
        // req.flash("success", "Welcome to Playlist-ify");
        res.redirect("/playlists");
      })
    } catch (e) {
      // req.flash("error", e.message);
      res.redirect("/register");
    }
  

    // const LikedSongs = {
    //   name: "Liked Songs",
    //   username: registeredUser.username,
    //   image:
    //     "http://4.bp.blogspot.com/-OAFqpDO7Igg/Uns5RBhVroI/AAAAAAAAZpQ/K1Izf_yUWCI/s1600/Green+Heart+Wallpapers.jpg",
    //   songs: [],
    //   author: userId
    // };

  // const playlist = new Playlist(LikedSongs);
  // await playlist.save();



  // Playlist.create(LikedSongs, function(err, newlyCreated) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     newlyCreated.save(function(err, playlist) {
  //       if (err) {
  //         console.log("Something whent wrong");
  //       } else {
  //         console.log(playlist.name + " saved");
  //       }
  //     });

  //   }
  // });


}));

router.get('/auth/logout', (req,res) => {
  req.logout();
  req.flash('success', "Bye! Come back soon")
  res.redirect('/browse')
})

module.exports = router;