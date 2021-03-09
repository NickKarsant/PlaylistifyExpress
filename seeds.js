var mongoose = require("mongoose");
var Song = require("./models/song");
var Artist = require("./models/artist");
var Playlist = require("./models/playlist");
var User = require("./models/user");

var artists = [
  {
    name: "Clozee",
    image:
      "http://images.sk-static.com/images/media/img/col3/20131112-173549-075429.jpg",
    songs: [
      { name: "Koto", artist: "Clozee", liked: false, length: "3:42" },
      { name: "Secret Place", artist: "Clozee", liked: false, length: "4:32" },
      {
        name: "Majesty Clozee remix",
        artist: "Waisu, Apashe, Clozee",
        liked: false, length: "3:12"
      },
      { name: "Baiana Clozee remix", artist: "Bakermat, Clozee", liked: false, length: "4:30" },
      { name: "Evasion", artist: "Clozee", liked: false, length: "2:20" },
      { name: "Aurora", artist: "Clozee", liked: false, length: "3:30" },
      { name: "Blank Panther", artist: "Clozee", liked: false, length: "3:10" },
      {
        name: "Blank Panther David Starfire Remix",
        artist: "Clozee, David Starfire",
        liked: false, length: "4:00"
      },
      {
        name: "Blank Panther PATH remix",
        artist: "Clozee, PATH",
        liked: false, length: "4:10"
      },
      { name: "Varshaver", artist: "Balkan Bump, Clozee", liked: false, length: "3:32" }
    ]
  },
  {
    name: "Good Lee",
    image:
      "https://i.pinimg.com/736x/3a/67/53/3a6753c3e3bd2dc85f15894921d62280.jpg",
    songs: [{ name: "Kintsugi", artist: "Good Lee", liked: false, length: "3:00" }]
  },
  {
    name: "Shahmen",
    image: "https://images-na.ssl-images-amazon.com/images/I/51CoIFAoIVL.jpg",
    songs: [
      {
        name: "Mark - Emr3ygul remix",
        artist: "Shahmen, Emery3gul",
        liked: false, length: "2:48"
      }
    ]
  }
];


var songs = [
  {
    name: "Maelstrom",
    artist: "Khamsin",
    liked: false,
    length: "3:31"
  },
  {
    name: "Mark - Emr3ygul remix",
    artist: "Shahmen, Emry3gul",
    liked: false,
    length: "2:48"
  },
  {
    name: "Mink & Shoes - Radiot edit",
    artist: "Psychemagik, Navid Izadi",
    liked: false,
    length: "3:24"
  },
  {
    name: "Farewell - Sauniks Remix",
    artist: "Spiffy Man, Sauniks",
    liked: false,
    length: "4:50"
  },
  {
    name: "Koto",
    artist: "Clozee",
    liked: false,
    length: "3:42"
  },
  {
    name: "Kintsugi",
    artist: "Good Lee",
    liked: false,
    length: "3:00"
  },
  {
    name: "Koto",
    artist: "Clozee",
    liked: false,
    length: "3:42"
  },
  {
    name: "Secret Place",
    artist: "Clozee",
    liked: false,
    length: "4:32"
  },
  {
    name: "Majesty - Clozee remix",
    artist: "Waisu, Apashe, Clozee",
    liked: false,
    length: "3:12"
  },
  {
    name: "Baiana - Clozee remix",
    artist: "Bakermat, Clozee",
    liked: false,
    length: "4:30"
  },
  {
    name: "Evasion",
    artist: "Clozee",
    liked: false,
    length: "2:20"
  },
  {
    name: "Aurora",
    artist: "Clozee",
    liked: false,
    length: "3:30"
  },
  {
    name: "Blank Panther",
    artist: "Clozee",
    liked: false,
    length: "3:10"
  },
  {
    name: "Blank Panther - David Starfire Remix",
    artist: "Clozee, David Starfire",
    liked: false,
    length: "4:00"
  },
  {
    name: "Blank Panther - PATH remix",
    artist: "Clozee, PATH",
    liked: false,
    length: "4:10"
  },
  {
    name: "Varshaver",
    artist: "Balkan Bump, Clozee",
    liked: false,
    length: "3:32"
  }
];

// function seedArtists(){
// //Remove all campgrounds
// Artist.deleteMany({}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("removed artists!");
//     artists.forEach(function(seed){
//       Artist.create(seed, function(err, artist){
//         if(err){
//           console.log(err)
//         } else {
//           console.log("added an artist");
//         }
//       });
//     });
//   }
//   });
// };

function seedDB() {
  console.log("seedDB startd");
  Artist.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      // console.log("removed artists!");
      artists.forEach(function(seed) {
        Artist.create(seed, function(err, artist) {
          if (err) {
            console.log(err);
          } else {
            // console.log("added an artist");
          }
        });
      });
    }
  });

  // Playlist.deleteMany({}, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } 
  // });

  Song.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      // console.log("removed songs!");
      songs.forEach(function(seed) {
        Song.create(seed, function(err, song) {
          if (err) {
            // console.log(err)
          } else {
            // console.log("added a song");
          }
        });
      });
    }
  });
  console.log("seedDB finsihed");
}


module.exports = seedDB;
