// toggle Hamgburger menu
$("#navbarText").on("show.bs.collapse", function() {
  $("a.nav-link").click(function() {
    $("#navbarText").collapse("hide");
  });
});

$("span#hamburger").click(function() {
  toggleHamburger
});

function toggleHamburger() {
  var menu = document.getElementById("hamburger");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}




var elements = document.getElementsByClassName("like");

var addToLikedSongs = function() {};

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", addToLikedSongs);
}
