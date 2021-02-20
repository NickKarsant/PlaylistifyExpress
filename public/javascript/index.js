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

  // heart/like button toggle
function toggleLiked() {
  if (this.style.color === "") {
    this.style.color = "green";
    var isLiked = true
  } else {
    this.style.color = "";
    var isLiked= false
  }
  return isLiked;
}

$("i.like").on('click', toggleLiked);






});
