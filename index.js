const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");

const User = require("./models/user");
const Playlist = require("./models/playlist");
const Song = require("./models/song");
const Artist = require("./models/artist");
const catchAsync = require("./utils/catchAsync");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

const playlistRoutes = require("./routes/playlists");
const userRoutes = require("./routes/users");
require('dotenv').config();

// const seedDB = require("./seeds");
// seedDB();

// process.env.MONGODB_URI ||
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/playlistify", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4
  }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/playlists", playlistRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/artist/:id",  catchAsync(async (req, res) => {
  var artist = await Artist.findById(req.params.id)
      .populate("song")
    if (!artist) {
      req.flash("error", "Artist not found");
      return res.redirect("/browse");
    }

    var usersPlaylists
    if (typeof req.user === 'undefined') {
      usersPlaylists = [];
    } else {
      const user = await User.find({
        _id: req.user._id
      });
      const userObject = user[0];
      usersPlaylists = userObject.playlists;
    }

    var songs = artist.songs;

  res.render("artists/show", { artist, songs, usersPlaylists })
  })
);

app.get(
  "/browse",
  catchAsync(async (req, res) => {
    const allPlaylists = await Playlist.find({});
    const allSongs = await Song.find({});
    const allArtists = await Artist.find({});

    // restrict "Liked Songs" plsylists from being displayed
    // console.log(allPlaylists);
    const removedLiked = [];
    allPlaylists.forEach(function(playlist) {
      if (playlist.name !== 'Liked Songs') {
        removedLiked.push(playlist);
      }
    });


    
    var usersPlaylists
    if (typeof req.user === 'undefined') {
      usersPlaylists = [];
    } else {
      const user = await User.find({
        _id: req.user._id
      });
      const userObject = user[0];
      usersPlaylists = userObject.playlists;
    }

    res.render("browse/index", {
      removedLiked,
      allSongs,
      allArtists,
      usersPlaylists
    });
  })
);
app.get(
  "/search",
  catchAsync(async (req, res) => {
    var usersPlaylists
    if (typeof req.user === 'undefined') {
      usersPlaylists = [];
    } else {
      const user = await User.find({
        _id: req.user._id
      });
      const userObject = user[0];
      usersPlaylists = userObject.playlists;
    }
    
    res.render("browse/search", { usersPlaylists });
  })
);

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
