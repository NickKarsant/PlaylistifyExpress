const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const User = require("./models/user");
const Playlist = require("./models/playlist");
const Song = require("./models/song");
const Artist = require("./models/artist");
const catchAsync = require('./utils/catchAsync');


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




app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/browse", catchAsync( async (req, res) => {

  const allPlaylists = await Playlist.find({});
  const allSongs = await Song.find({});
  const allArtists = await Artist.find({});

  res.render("browse/index", { allPlaylists, allSongs, allArtists });
}));

app.get("/playlists/new", (req, res) => {
  res.render("playlists/new");
});

app.post('/playlists', catchAsync (async (req, res) => {
  const playlist = new Playlist(req.body);
  await playlist.save();
  res.redirect(`/playlists/${playlist._id}`)
}));

app.get('/playlists/:id', catchAsync (async (req, res,) => {
    const playlist = await Playlist.findById(req.params.id)
    console.log(req.params);
    res.render('playlists/show', { playlist });

}));

// if click heart icon update "Liked Songs playlist" by adding song to playlists' song array
app.patch('/playlists/:id', catchAsync (async (req, res,) => {
  const song = await Song.findById(req.params.id)
  
  res.render('playlists/show', { playlist });
}));



app.delete('/playlists/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    await Playlist.findByIdAndDelete(id);
    res.redirect('/browse');
}));



// Auth login/regster
app.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

app.get("/auth/register", (req, res) => {
  res.render("auth/register");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
