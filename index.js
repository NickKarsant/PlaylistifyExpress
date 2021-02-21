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
const seedDB = require("./seeds");


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
seedDB();

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})



const isLoggedIn = (req,res,next) => {
  if (!req.isAuthenticated()){
    req.flash('error', "You must be signed in first");
    return res.redirect('/login');
  }
  next();
}



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

app.get("/playlists", isLoggedIn, (req, res) => {
  res.render("playlists/index");
});

app.get("/playlists/new", isLoggedIn, (req, res) => {

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
  "/playlists/:id", isLoggedIn,
  catchAsync(async (req, res) => {
    console.log("hit patch route");
    // const song = await Song.findById(req.params.id)
    // const likedPlaylist = await Playlist.find({name: "Liked Songs"})

    res.render();
  })
);

app.delete(
  "/playlists/:id", isLoggedIn,
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
      const newUser = new User({ username: username, email: email, });

      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      // making LIked Songs playist should happene here
      


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

app.get('/auth/logout', (req,res) => {
  req.logout();
  req.flash('success', "Bye! Come back soon")
  res.redirect('/browse')
})


app.listen(3000, () => {
  console.log("Serving on port 3000");
});
