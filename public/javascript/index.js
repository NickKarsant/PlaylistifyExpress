

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




var elements = document.getElementsByClassName("like");

var addToLikedSongs = function() {};

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", addToLikedSongs);
}
