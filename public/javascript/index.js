$(document).ready(function() {
  console.log("ready!");

  // toggle Hamgburger menu
  $("span#hamburger").click(function() {
    toggleHamburger();
  });

  function toggleHamburger() {
    var menu = document.getElementById("navbarText");
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  $("#navbarText").on("click", function() {
    $("a.nav-link").click(function() {
      $("#navbarText").css("display", "none");
    });
  });


  function goBack() {
    window.history.back();
  }

  function goForward() {
    window.history.forward();
  }




  // heart/like button toggle
function toggleLiked() {
  console.log("clicked");
  if (this.classList.contains("far")) {
    this.classList.remove("far");
    this.classList.add("fas");
    this.style.color = "green";
    var isLiked = true
  } else {
    this.classList.remove("fas");
    this.classList.add("far");
    this.style.color = "";
    var isLiked= false
  }
  return isLiked;
}

$("i.like").on('click', toggleLiked);



function hoverShowOptions(song) {  
  var optionsIcon = song.getElementsByClassName("options")[0];
  optionsIcon.style.display = "block";
}

function hoverHideOptions(song) {  
  var optionsIcon = song.getElementsByClassName("options")[0];
    optionsIcon.style.display = "none";
}

let songs = document.querySelectorAll('.songRow')

songs.forEach(song => {
  song.addEventListener('mouseover', e => {
    hoverShowOptions(song);
  });
})

songs.forEach(song => {
  song.addEventListener('mouseout', e => {
    hoverHideOptions(song);
  })
})



// add song to a playlist
var playlistChoices = document.querySelectorAll("li p.playlistChoice");

playlistChoices.forEach(choice => {
  choice.addEventListener('click', e => {
  console.log("clicked")
  })
})
var meatballs = document.querySelectorAll(".meatball");

meatballs.forEach(menu => {
  menu.addEventListener('click', e => {
  console.log("clicked")
  })
})



searchBar = document.getElementById('searchBar');


$("#searchBar").submit(function(e){
  e.preventDefault();
});

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value)
})










});
