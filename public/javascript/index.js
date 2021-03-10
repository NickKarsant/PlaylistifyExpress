$(document).ready(function() {
  console.log("ready!");

  // toggle Hamgburger menu
  $("span#hamburger").click(function() {
    console.log("click");
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
  let optionsIcon = song.getElementsByClassName("options")[0];

  console.log(optionsIcon);
    optionsIcon.style.display = "block";

}

function hoverHideOptions(song) {  
  let optionsIcon = song.getElementsByClassName("options")[0];

  console.log(optionsIcon);
    optionsIcon.style.display = "none";

}

let songs = document.querySelectorAll('.songRow')

songs.forEach(song => {
  song.addEventListener('mouseover', e => {
    // console.log(song);
    hoverShowOptions(song);
  })
})

songs.forEach(song => {
  song.addEventListener('mouseout', e => {
    // console.log(song);
    hoverHideOptions(song);
  })
})














});
