const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("flash");

const User = require("./models/user");
const Playlist = require("./models/playlist");
const Song = require("./models/song");
const Artist = require("./models/artist");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

mongoose.connect("mongodb://localhost:27017/playlistify", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

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
    maxAge: 1000 * 60 * 60 * 24 * 7 * 30
  }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("landing");
});

app.get(
  "/browse",
  catchAsync(async (req, res) => {
    const allPlaylists = await Playlist.find({});
    const allSongs = await Song.find({});
    const allArtists = await Artist.find({});

    res.render("browse/index", { allPlaylists, allSongs, allArtists });
  })
);

app.get("/playlists", (req, res) => {
  res.render("playlists/index");
});

app.get("/playlists/new", (req, res) => {
  res.render("playlists/new");
});

app.post(
  "/playlists",
  catchAsync(async (req, res) => {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.redirect(`/playlists/${playlist._id}`);
  })
);

app.get(
  "/playlists/:id",
  catchAsync(async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    res.render("playlists/show", { playlist });
  })
);

// if click heart icon update "Liked Songs playlist" by adding song to playlists' song array
app.patch(
  "/playlists/:id",
  catchAsync(async (req, res) => {
    console.log("hit patch route");
    // const song = await Song.findById(req.params.id)
    // const likedPlaylist = await Playlist.find({name: "Liked Songs"})

    res.render();
  })
);

app.delete(
  "/playlists/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Playlist.findByIdAndDelete(id);
    res.redirect("/browse");
  })
);

// Auth display login/regster
app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

// auth
app.post(
  "/auth/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    successRedirect: "/playlists"
  }),
  (req, res) => {
    // req.flash('success', "Welcome back!");
    res.redirect('/playlists');
  }
);

app.post(
  "/auth/register",
  catchAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username: username, email: email });

      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      // req.flash("success", "Welcome to Playlist-ify");
      res.redirect("/playlists");
    } catch (e) {
      // req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
