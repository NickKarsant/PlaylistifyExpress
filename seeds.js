// var mongoose = require("mongoose");
// var Song = require("./models/song");
// var Artist = require("./models/artist");
// var Playlist = require("./models/playlist");
// var User = require("./models/user");

// var artists = [
//   {
//     name: "Clozee",
//     image:
//       "http://images.sk-static.com/images/media/img/col3/20131112-173549-075429.jpg",
//     songs: [
//       {
//         _id: "1",
//         name: "Koto",
//         artist: "Clozee",
//         liked: false,
//         length: "3:42"
//       },
//       {
//         _id: "2",
//         name: "Secret Place",
//         artist: "Clozee",
//         liked: false,
//         length: "4:32"
//       },
//       {
//         _id: "3",
//         name: "Majesty Clozee remix",
//         artist: "Waisu, Apashe, Clozee",
//         liked: false,
//         length: "3:12"
//       },
//       {
//         _id: "4",
//         name: "Baiana Clozee remix",
//         artist: "Bakermat, Clozee",
//         liked: false,
//         length: "4:30"
//       },
//       {
//         _id: "5",
//         name: "Evasion",
//         artist: "Clozee",
//         liked: false,
//         length: "2:20"
//       },
//       {
//         _id: "6",
//         name: "Aurora",
//         artist: "Clozee",
//         liked: false,
//         length: "3:30"
//       },
//       {
//         _id: "7",
//         name: "Blank Panther",
//         artist: "Clozee",
//         liked: false,
//         length: "3:10"
//       },
//       {
//         _id: "8",
//         name: "Blank Panther David Starfire Remix",
//         artist: "Clozee, David Starfire",
//         liked: false,
//         length: "4:00"
//       },
//       {
//         _id: "9",
//         name: "Blank Panther PATH remix",
//         artist: "Clozee, PATH",
//         liked: false,
//         length: "4:10"
//       },
//       {
//         _id: "10",
//         name: "Varshaver",
//         artist: "Balkan Bump, Clozee",
//         liked: false,
//         length: "3:32"
//       }
//     ]
//   },
//   {
//     name: "Good Lee",
//     image:
//       "https://i.pinimg.com/736x/3a/67/53/3a6753c3e3bd2dc85f15894921d62280.jpg",
//     songs: [
//       {
//         _id: "11",
//         name: "Kintsugi",
//         artist: "Good Lee",
//         liked: false,
//         length: "3:00"
//       }
//     ]
//   },
//   {
//     name: "Shahmen",
//     image: "https://images-na.ssl-images-amazon.com/images/I/51CoIFAoIVL.jpg",
//     songs: [
//       {
//         _id: "12",
//         name: "Mark - Emr3ygul remix",
//         artist: "Shahmen, Emery3gul",
//         liked: false,
//         length: "2:48"
//       }
//     ]
//   }
// ];

// var songs = [
//   {
//     _id: "1",
//     name: "Maelstrom",
//     artist: "Khamsin",
//     liked: false,
//     length: "3:31"
//   },
//   {
//     _id: "2",
//     name: "Mark - Emr3ygul remix",
//     artist: "Shahmen, Emry3gul",
//     liked: false,
//     length: "2:48"
//   },
//   {
//     _id: "3",
//     name: "Mink & Shoes - Radiot edit",
//     artist: "Psychemagik, Navid Izadi",
//     liked: false,
//     length: "3:24"
//   },
//   {
//     _id: "4",
//     name: "Farewell - Sauniks Remix",
//     artist: "Spiffy Man, Sauniks",
//     liked: false,
//     length: "4:50"
//   },
//   {
//     _id: "5",
//     name: "Koto",
//     artist: "Clozee",
//     liked: false,
//     length: "3:42"
//   },
//   {
//     _id: "6",
//     name: "Kintsugi",
//     artist: "Good Lee",
//     liked: false,
//     length: "3:00"
//   },
//   {
//     _id: "7",
//     name: "Koto",
//     artist: "Clozee",
//     liked: false,
//     length: "3:42"
//   },
//   {
//     _id: "8",
//     name: "Secret Place",
//     artist: "Clozee",
//     liked: false,
//     length: "4:32"
//   },
//   {
//     _id: "9",
//     name: "Majesty - Clozee remix",
//     artist: "Waisu, Apashe, Clozee",
//     liked: false,
//     length: "3:12"
//   },
//   {
//     _id: "10",
//     name: "Baiana - Clozee remix",
//     artist: "Bakermat, Clozee",
//     liked: false,
//     length: "4:30"
//   },
//   {
//     _id: "11",
//     name: "Evasion",
//     artist: "Clozee",
//     liked: false,
//     length: "2:20"
//   },
//   {
//     _id: "12",
//     name: "Aurora",
//     artist: "Clozee",
//     liked: false,
//     length: "3:30"
//   },
//   {
//     _id: "13",
//     name: "Blank Panther",
//     artist: "Clozee",
//     liked: false,
//     length: "3:10"
//   },
//   {
//     _id: "14",
//     name: "Blank Panther - David Starfire Remix",
//     artist: "Clozee, David Starfire",
//     liked: false,
//     length: "4:00"
//   },
//   {
//     _id: "15",
//     name: "Blank Panther - PATH remix",
//     artist: "Clozee, PATH",
//     liked: false,
//     length: "4:10"
//   },
//   {
//     _id: "16",
//     name: "Varshaver",
//     artist: "Balkan Bump, Clozee",
//     liked: false,
//     length: "3:32"
//   }
// ];



// // const seededPlaylist = {
// //   name: "seededPlaylist",
// //   image: "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg",
// //   author: "60444285be40b2966bc6bf76",
// //   songs: [
// //     {
// //       _id: "11",
// //       name: "Kintsugi",
// //       artist: "Good Lee",
// //       liked: false,
// //       length: "3:00"
// //     },
// //     {
// //       _id: "15",
// //       name: "Blank Panther - PATH remix",
// //       artist: "Clozee, PATH",
// //       liked: false,
// //       length: "4:10"
// //     },
// //     {
// //       _id: "16",
// //       name: "Varshaver",
// //       artist: "Balkan Bump, Clozee",
// //       liked: false,
// //       length: "3:32"
// //     },
// //     {
// //       _id: "5",
// //       name: "Koto",
// //       artist: "Clozee",
// //       liked: false,
// //       length: "3:42"
// //     },
// //     {
// //       _id: "6",
// //       name: "Kintsugi",
// //       artist: "Good Lee",
// //       liked: false,
// //       length: "3:00"
// //     }]
// // };



// const seedDB = async ( ) => {
//   console.log("seedDB startd");
//   Artist.deleteMany({}, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log("removed artists!");
//       artists.forEach(function(seed) {
//         Artist.create(seed, function(err, artist) {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log("added an artist");
//           }
//         });
//       });
//     }
//   });

//   // Playlist.deleteOne({name: "seededPlaylist"}, function(err) {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     // seedPlaylists.forEach(function(playlist) {
//   //       Playlist.create(seededPlaylist, function(err, playlist) {
//   //         if (err) {
//   //           console.log(err)
//   //         } else {
//   //           console.log("added a playlist: " + playlist);
//   //         }
//   //       });
//   //     // });
//   //     }
//   // });

//   Song.deleteMany({}, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("removed songs!");
//       songs.forEach(function(seed) {
//         Song.create(seed, function(err, song) {
//           if (err) {
//             console.log(err)
//           } else {
//             // console.log("added a song");
//           }
//         });
//       });
//     }
//   });
//   console.log("seedDB finsihed");
// }

// module.exports = seedDB;

