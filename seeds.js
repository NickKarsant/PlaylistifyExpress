var mongoose = require("mongoose");
var Song   = require("./models/song");
var Artist   = require("./models/artist");

var artists = [
  {
    name: "Clozee", 
    image: "http://images.sk-static.com/images/media/img/col3/20131112-173549-075429.jpg",
    songs: [
      {name: "Koto", artist: "Clozee", liked: false},
      {name: "Secret Place", artist: "Clozee", liked: false},
      {name: "Majesty Clozee remix", artist: "Waisu, Apashe, Clozee", liked: false},
      {name: "Baiana Clozee remix", artist: "Bakermat, Clozee", liked: false},
      {name: "Evasion", artist: "Clozee", liked: false},
      {name: "Aurora", artist: "Clozee", liked: false},
      {name: "Blank Panther", artist: "Clozee", liked: false},
      {name: "Blank Panther David Starfire Remix", artist: "Clozee, David Starfire", liked: false},
      {name: "Blank Panther PATH remix", artist: "Clozee, PATH", liked: false},
      {name: "Varshaver", artist: "Balkan Bump, Clozee", liked: false}
    ]    
  },
  { 
    name: "Good Lee", 
    image: "https://i.pinimg.com/736x/3a/67/53/3a6753c3e3bd2dc85f15894921d62280.jpg",
    songs: [
      {name: "Kintsugi", artist: "Good Lee", liked: false}
    ]
  },
  {
    name: "Shahmen", 
    image: "https://images-na.ssl-images-amazon.com/images/I/51CoIFAoIVL.jpg",
    songs: [
      {name: "Mark - Emr3ygul remix", artist: "Shahmen, Emery3gul", liked: false},
    ]
  }   
];

var  songs = [
  {
    name: "Maelstrom", 
    artist: "Khamsin", 
    liked: false
  },
  {
    name: "Mark - Emr3ygul remix", 
    artist: "Shahmen, Emry3gul", 
    liked: false 
  },
  {
    name: "Mink & Shoes - Radiot edit", 
    artist: "Psychemagik, Navid Izadi" , 
    liked: false
  },
  {
    name: "Farewell - Sauniks Remix", 
    artist: "Spiffy Man, Sauniks", 
    liked: false 
  },
  {
    name: "Koto", 
    artist: "Clozee",
    liked: false 
  },
  {
    name: "Kintsugi", 
  artist: "Good Lee", 
  liked: false
  },
    {
      name: "Koto", 
    artist: "Clozee", 
    liked: false
  },
    {
      name: "Secret Place", 
    artist: "Clozee", 
    liked: false
  },
    {
      name: "Majesty - Clozee remix", 
    artist: "Waisu, Apashe, Clozee", 
    liked: false
  },
    {
      name: "Baiana - Clozee remix", 
    artist: "Bakermat, Clozee", 
    liked: false
  },
    {
      name: "Evasion", 
    artist: "Clozee", 
    liked: false
  },
    {
      name: "Aurora", 
    artist: "Clozee", 
    liked: false
  },
    {
      name: "Blank Panther", 
    artist: "Clozee", 
    liked: false
  },
    { name: "Blank Panther - David Starfire Remix", 
    artist: "Clozee, David Starfire", 
    liked: false
  },
    {
      name: "Blank Panther - PATH remix", 
    artist: "Clozee, PATH", 
    liked: false
  },
    {
      name: "Varshaver", 
    artist: "Balkan Bump, Clozee", 
    liked: false
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



function seedDB(){
  console.log("seedDB startd");
  Artist.deleteMany({}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("removed artists!");
      artists.forEach(function(seed){
        Artist.create(seed, function(err, artist){
          if(err){
            console.log(err)
          } else {
            console.log("added an artist");
          }
        });
      });
    }
  });

  Song.deleteMany({}, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("removed songs!");
      songs.forEach(function(seed){
        Song.create(seed, function(err, song){
          if(err){
            // console.log(err)
          } else {
            console.log("added a song");
          }
        });
      });
    }
    });
    console.log("seedDB finsihed");

};

// function seedDB(){
//    //Remove all campgrounds
//    Campground.deleteMany({}, function(err){
//         if (err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.deleteMany({}, function(err) {
//             if (err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//             //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author:{
//                                     id : "588c2e092403d111454fff76",
//                                     username: "Jack"
//                                 }
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         })
//     }); 
//     //add a few comments
// }
 
module.exports = seedDB;
