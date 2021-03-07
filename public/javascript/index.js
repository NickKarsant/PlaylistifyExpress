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
  console.log(this.classList);
  console.log(this.classList.value);
  if (this.classList.contains("far")) {
    console.log("contains");
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

















});
